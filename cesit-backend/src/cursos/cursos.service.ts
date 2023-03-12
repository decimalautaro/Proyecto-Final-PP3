import { faker } from '@faker-js/faker';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import PaginatedResponseDto from 'src/common/dtos/paginated-response.dto';
import { randomIntFromInterval } from 'src/common/utils/numbers.utils';
import { CreateCursoDto } from './dto/create-curso.dto';
import { FindAllPagintedDto } from './dto/find-all-cursos.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { Alumno } from '../alumnos/entities/alumno.entity';
import { Materia } from '../materias/entities/materia.entity';
import { CondicionValida } from './entities/curso.enums';

function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Curso.name) private cursoRepository: Model<Curso>,
    @InjectModel(Alumno.name) private alumnoRepository: Model<Alumno>,
    @InjectModel(Materia.name) private materiaRepository: Model<Materia>,
  ) {}

  async validacion_alumno(id_alumno: string | null) {
    if (!!id_alumno) {
      const alumno = await this.alumnoRepository.findById(id_alumno);
      if (alumno == null) {
        throw new BadRequestException(
          `Alumno con id="${id_alumno}" no fue encontrado`,
        );
      }
    }
  }

  async validacion_materia(id_materia: string | null) {
    if (!!id_materia) {
      const materia = await this.materiaRepository.findById(id_materia);
      if (!materia) {
        throw new BadRequestException(
          `Materia con id="${id_materia}" no fue encontrado`,
        );
      }
    }
  }

  async create(createCursoDto: CreateCursoDto) {
    await this.validacion_alumno(createCursoDto.alumno);
    await this.validacion_materia(createCursoDto.materia);
    return this.cursoRepository.create(createCursoDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 10, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['condicion'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    ['anio'].forEach((key) => {
      if (findAllDto[key]) {
        query.push({
          [key]: { $eq: findAllDto[key] },
        });
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const cursos = await this.cursoRepository
      .find(findQuery)
      .limit(limit)
      .skip(offset)
      .populate('alumno')
      .populate('materia');
    const count = await this.cursoRepository.count(findQuery);
    return new PaginatedResponseDto<Curso>(cursos, offset, limit, count);
  }

  async findById(id: string) {
    let curso: Curso;

    if (isValidObjectId(id)) {
      curso = await this.cursoRepository
        .findById(id)
        .populate('alumno')
        .populate('materia');
    }

    if (!curso)
      throw new NotFoundException(`No se puede encontrar la curso id=${id}`);

    return curso;
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    const curso = await this.findById(id);
    await this.validacion_alumno(updateCursoDto.alumno);
    await this.validacion_materia(updateCursoDto.materia);

    try {
      await curso.updateOne(updateCursoDto);
      return { ...curso.toJSON(), ...updateCursoDto };
    } catch (error) {
      this.handleErrorExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.cursoRepository.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Curso id="${id}" no ha sido encontrado`);
    return;
  }

  private handleErrorExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El curso ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(`No se puede crear el curso`);
  }

  async crearSetPruebas() {
    await this.cursoRepository.remove({});
    for (let i = 0; i < 100; i++) {
      const createCursoDto = {
        anio: randomIntFromInterval(0, 5),
        nota: randomIntFromInterval(0, 10),
        presentismo: randomIntFromInterval(0, 100),
        condicion: faker.helpers.arrayElement([
          CondicionValida.Promocion,
          CondicionValida.Libre,
          CondicionValida.Recursa,
          CondicionValida.Regular,
        ]),
      } as CreateCursoDto;
      this.cursoRepository.create(createCursoDto);
    }
  }
}
