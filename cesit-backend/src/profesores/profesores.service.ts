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
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { UpdateProfesorDto } from './dto/update-profesore.dto';
import { Profesor } from './entities/profesore.entity';

function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectModel(Profesor.name) private profesorRepository: Model<Profesor>,
  ) {}
  create(createProfesorDto: CreateProfesorDto) {
    return this.profesorRepository.create(createProfesorDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 5, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['apellido', 'nombre', 'dni'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const profesores = await this.profesorRepository
      .find(findQuery)
      .limit(limit)
      .skip(offset);
    const count = await this.profesorRepository.count(findQuery);
    return new PaginatedResponseDto<Profesor>(profesores, offset, limit, count);
  }

  async findById(id: string) {
    let profesor: Profesor;

    if (isValidObjectId(id)) {
      profesor = await this.profesorRepository.findById(id);
    }

    if (!profesor)
      throw new NotFoundException(`No se puede encontrar el profesor id=${id}`);

    return profesor;
  }

  async update(id: string, updateProfesorDto: UpdateProfesorDto) {
    const profesor = await this.findById(id);
    try {
      await profesor.updateOne(updateProfesorDto);
      return { ...profesor.toJSON(), ...updateProfesorDto };
    } catch (error) {
      this.handleErrorExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.profesorRepository.deleteOne({
      _id: id,
    });
    if (deletedCount === 0)
      throw new BadRequestException(`Profesor id="${id}" no ha sido encontrado`);
    return;
  }

  private handleErrorExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El profesor ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(`No se puede crear el prfesor`);
  }

  async crearSetPruebas() {
    await this.profesorRepository.remove({});
    for (let i = 0; i < 100; i++) {
      const createProfesorDto = {
        nombre: faker.helpers.arrayElement(['Juan', 'Pedro', 'Maria', 'Jose']),
        apellido: faker.helpers.arrayElement([
          'Perez',
          'Gomez',
          'Lopez',
          'Martinez',
        ]),
        dni: randomIntFromInterval(0, 11111111).toString(),
        fechaNacimiento: faker.date.birthdate({
          min: 1950,
          max: 2022,
          mode: 'year',
        }),
      } as CreateProfesorDto;
      this.profesorRepository.create(createProfesorDto);
    }
  }
}
