import { faker } from '@faker-js/faker';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import PaginatedResponseDto from 'src/common/dtos/paginated-response.dto';
import { randomIntFromInterval } from 'src/common/utils/numbers.utils';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { Materia } from '../materias/entities/materia.entity';
import { alumnoGetAll, alumnoGetOne } from './entities/almno.interface';

function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class AlumnosService {
  constructor(
    @InjectModel(Alumno.name) private alumnoRepository: Model<Alumno>,
    @InjectModel(Materia.name) private materiaRepository: Model<Materia>,
  ) {}
  create(createAlumnoDto: CreateAlumnoDto) {
    return this.alumnoRepository.create(createAlumnoDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 10, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['nombre', 'apellido', 'dni', 'domicilio'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const alumnos = (await this.alumnoRepository
      .aggregate([
        {
          $match: findQuery,
        },
        {
          $lookup: {
            from: 'cursos',
            localField: '_id',
            foreignField: 'alumno',
            as: 'cursos',
          },
        },
        {
          $lookup: {
            from: 'materias',
            localField: 'cursos.materia',
            foreignField: '_id',
            as: 'materias',
          },
        },
      ])
      .project({
        cursos: {
          _id: false,
          alumno: false,
          materia: false,
          __v: false,
        },
        materias: {
          _id: false,
          __v: false,
        },
      })
      .limit(limit)
      .skip(offset)) as alumnoGetAll[];
    const count = await this.alumnoRepository.count(findQuery);
    return new PaginatedResponseDto<alumnoGetAll>(alumnos, offset, limit, count);
  }

  async findById(id: string) {
    let alumno;

    if (isValidObjectId(id)) {
      alumno = await this.alumnoRepository
        .aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(id),
            },
          },
          {
            $lookup: {
              from: 'cursos',
              localField: '_id',
              foreignField: 'alumno',
              as: 'cursos',
            },
          },
        ])
        .project({
          cursos: {
            _id: false,
            alumno: false,
            __v: false,
          },
        });
    }

    const alumnoBuscado = alumno[0] as alumnoGetOne;

    if (!alumnoBuscado)
      throw new NotFoundException(`No se puede encontrar el alumno id=${id}`);

    for (const curso of alumnoBuscado.cursos) {
      // const materia_id = curso.materia.toJSON();
      const materia_id = curso.materia;
      if (materia_id) {
        curso.materia = await this.materiaRepository.findById(materia_id);
      }
    }

    return alumnoBuscado;
  }

  async update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
    const alumno = await this.alumnoRepository.findById(id);
    if (!alumno)
      throw new NotFoundException(`No se puede encontrar el alumno id=${id}`);

    try {
      await alumno.updateOne(updateAlumnoDto);
      return { ...alumno.toJSON(), ...updateAlumnoDto };
    } catch (error) {
      this.handleErrorExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.alumnoRepository.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Alumno id="${id}" no ha sido encontrado`);
    return;
  }

  private handleErrorExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El alumno ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(`No se puede crear el alumno`);
  }

  async crearSetPruebas() {
    await this.alumnoRepository.remove({});
    for (let i = 0; i < 100; i++) {
      const createAlumnoDto = {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        dni: randomIntFromInterval(0, 11111111).toString(),
        domicilio: [
          {
            calle: faker.address.street(),
            numero: faker.address.zipCode().toString(),
            localidad: faker.address.direction(),
            provincia: faker.address.city(),
          },
        ],
        fechaNacimiento: faker.date.birthdate({
          min: 1950,
          max: 2022,
          mode: 'year',
        }),
      } as unknown as CreateAlumnoDto;
      this.alumnoRepository.create(createAlumnoDto);
    }
  }
}
