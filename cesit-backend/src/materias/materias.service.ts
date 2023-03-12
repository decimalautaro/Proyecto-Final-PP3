import { faker } from '@faker-js/faker';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import PaginatedResponseDto from 'src/common/dtos/paginated-response.dto';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';


function getQueryParam(key: string, value: string) {
  return { [key]: { $regex: new RegExp(value, 'i') } };
}

@Injectable()
export class MateriasService {
  constructor(
    @InjectModel(Materia.name) private materiaRepository: Model<Materia>,
  ) { }
  create(createMateriaDto: CreateMateriaDto) {
    return this.materiaRepository.create(createMateriaDto);
  }

  async findAll(findAllDto: FindAllPagintedDto) {
    const { limit = 10, offset = 0, _type = 'or' } = findAllDto;

    const query = [];
    ['nombre', 'profesor'].forEach((key) => {
      if (findAllDto[key]) {
        query.push(getQueryParam(key, findAllDto[key]));
      }
    });

    const findQuery = query.length > 0 ? { [`$${_type}`]: query } : {};
    const materias = await this.materiaRepository
      .find(findQuery)
      .limit(limit)
      .skip(offset);
    const count = await this.materiaRepository.count(findQuery);
    return new PaginatedResponseDto<Materia>(materias, offset, limit, count);
  }


  async findById(id: string) {

    let materia: Materia;

    if (isValidObjectId(id)) {
      materia = await this.materiaRepository.findById(id);
    }

    if (!materia)
      throw new NotFoundException(`No se puede encontrar el materia id=${id}`);

    return materia;
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto) {
    const materia = await this.findById(id);
    try {
      await materia.updateOne(updateMateriaDto);
      return { ...materia.toJSON(), ...updateMateriaDto };
    } catch (error) {
      this.handleErrorExceptions(error);
    }

  }

  async remove(id: string) {

    const { deletedCount } = await this.materiaRepository.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Materia id="${id}" no ha sido encontrado`);
    return;

  }

  private handleErrorExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `La materia ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.error(error);
    throw new InternalServerErrorException(`No se puede crear la materia`);
  }

  async crearSetPruebas() {
    await this.materiaRepository.remove({});
    for (let i = 0; i < 100; i++) {
      const createMateriaDto = {
        nombre: faker.helpers.arrayElement(['desarrollo de software', 'sistemas', 'mecatronica', 'electronica', 'industrial']),
        profesor: faker.name.firstName(),
        duracion: faker.helpers.arrayElement(['anual', 'semestral']),
        condicionMateria: faker.helpers.arrayElement(['regular', 'promocion', 'libre', 'recursa'])
      } as CreateMateriaDto;
      this.materiaRepository.create(createMateriaDto);
    }
  }
}
