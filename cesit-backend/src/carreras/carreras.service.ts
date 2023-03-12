import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import PaginatedResponseDto from 'src/common/dtos/paginated-response.dto';
import { randomIntFromInterval } from 'src/common/utils/numbers.utils';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { Carrera } from './entities/carrera.entity';



function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class CarrerasService {
  constructor(
    @InjectModel(Carrera.name) private carreraRepository: Model<Carrera>,
  ) { }
  create(createCarreraDto: CreateCarreraDto) {
    return this.carreraRepository.create(createCarreraDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 10, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['nombre', 'duracion'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const carreras = await this.carreraRepository
      .find(findQuery)
      .limit(limit)
      .skip(offset);
    const count = await this.carreraRepository.count(findQuery);
    return new PaginatedResponseDto<Carrera>(carreras, offset, limit, count);
  }


  async findById(id: string) {

    let carrera: Carrera;

    if (isValidObjectId(id)) {
      carrera = await this.carreraRepository.findById(id);
    }

    if (!carrera)
      throw new NotFoundException(`No se puede encontrar la carrera id=${id}`);

    return carrera;
  }

  async update(id: string, updateCarreraDto: UpdateCarreraDto) {
    const carrera = await this.findById(id);
    try {
      await carrera.updateOne(updateCarreraDto);
      return { ...carrera.toJSON(), ...updateCarreraDto };
    } catch (error) {
      this.handleErrorExceptions(error);
    }

  }

  async remove(id: string) {

    const { deletedCount } = await this.carreraRepository.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Carrera id="${id}" no ha sido encontrada`);
    return;

  }

  private handleErrorExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `La carrera ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(`No se puede crear la tarea`);
  }

  async crearSetPruebas() {
    await this.carreraRepository.remove({});
    for (let i = 0; i < 100; i++) {
      const createCarreraDto = {
        nombre: `${i} ${i % 2 ? 'abc' : 'xyz'} - ${faker.lorem.sentence(6)}`,
        duracion: randomIntFromInterval(0, 5).toString(),
        horario: faker.helpers.arrayElement(['manana', 'tarde', 'noche']),
        plan: faker.lorem.paragraph(3),
      } as CreateCarreraDto;
      this.carreraRepository.create(createCarreraDto);
    }
  }
}
