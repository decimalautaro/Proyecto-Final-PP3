import { Tarea } from './entities/tarea.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Model } from 'mongoose';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { faker } from '@faker-js/faker';
import { randomIntFromInterval } from '../common/utils/numbers.utils';
import PaginatedResponseDto from 'src/common/dtos/paginated-response.dto';

function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class TareasService {
  constructor(
    @InjectModel(Tarea.name) private readonly tareaRepository: Model<Tarea>,
  ) { }

  create(createTareaDto: CreateTareaDto) {
    return this.tareaRepository.create(createTareaDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 10, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['nombre', 'descripcion', 'roles'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const tareas = await this.tareaRepository
      .find(findQuery)
      .limit(limit)
      .skip(offset);
    const count = await this.tareaRepository.count(findQuery);
    return new PaginatedResponseDto<Tarea>(tareas, offset, limit, count);
  }

  findById(id: string) {
    const tarea = this.tareaRepository.findById<Tarea>(id);

    if (!tarea)
      throw new NotFoundException(`No se puede encontrar la tarea id=${id}`);

    return tarea;
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    const tarea = await this.findById(id);
    try {
      await tarea.updateOne(updateTareaDto);
      return { ...tarea.toJSON(), ...updateTareaDto };
    } catch (error) {
      this.handleErrorExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.tareaRepository.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Tarea id="${id}" no ha sido encontrada`);

    return;
  }

  private handleErrorExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `La tarea ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(`No se puede crear la tarea`);
  }

  // https://fakerjs.dev/
  async crearSetProuebas() {
    await this.tareaRepository.remove({});
    for (let i = 0; i < 100; i++) {
      const createTareaDto = {
        nombre: `${i} ${i % 2 ? 'abc' : 'xyz'} - ${faker.lorem.sentence(6)}`,
        descripcion: faker.lorem.paragraph(3),
        finalizada: Boolean(Math.random() < 0.5),
        fechaLimite: new Date(faker.date.soon()),
        progreso: randomIntFromInterval(0, 100),
      } as CreateTareaDto;
      this.tareaRepository.create(createTareaDto);
    }
  }
}
