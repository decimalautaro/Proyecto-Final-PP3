import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import PaginatedResponseDto from 'src/common/dtos/paginated-response.dto';
import { randomIntFromInterval } from 'src/common/utils/numbers.utils';
import { CreateCursoDto } from './dto/create-curso.dto';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';




function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Curso.name) private cursoRepository: Model<Curso>,
  ) { }
  create(createCursoDto: CreateCursoDto) {
    return this.cursoRepository.create(createCursoDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 10, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['carrera', 'bedelia'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const cursos = await this.cursoRepository
      .find(findQuery)
      .limit(limit)
      .skip(offset);
    const count = await this.cursoRepository.count(findQuery);
    return new PaginatedResponseDto<Curso>(cursos, offset, limit, count);
  }


  async findById(id: string) {

    let curso: Curso;

    if (isValidObjectId(id)) {
      curso = await this.cursoRepository.findById(id);
    }

    if (!curso)
      throw new NotFoundException(`No se puede encontrar la curso id=${id}`);

    return curso;
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    const curso = await this.findById(id);
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
        cantidadAlumnos: randomIntFromInterval(0, 80),
        carrera: faker.helpers.arrayElement(['desarrollo de software', 'sistemas', 'mecatronica', 'electronica', 'industrial']),
        bedelia: faker.helpers.arrayElement(['mercedes', 'maria', 'jose', 'juan']),
      } as CreateCursoDto;
      this.cursoRepository.create(createCursoDto);
    }
  }
}
