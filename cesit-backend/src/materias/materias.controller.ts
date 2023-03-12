import { AppPath } from './../common/constants/path';
import { ValidRoles } from 'src/auth/interfaces';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MateriasService } from './materias.service';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Auth } from 'src/auth/decorators';

@Controller()
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post(AppPath.MateriasCreate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get(AppPath.MateriasFindAll)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() findAllDto: FindAllPagintedDto) {
    return this.materiasService.findAll(findAllDto);
  }

  @Get(AppPath.MateriasFindOne)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.materiasService.findById(id);
  }

  @Patch(AppPath.MateriasUpdate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiasService.update(id, updateMateriaDto);
  }

  @Delete(AppPath.MateriasRemove)
  @Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.materiasService.remove(id);
  }

  @Post(AppPath.MateriasCreateFakeData)
  @Auth(ValidRoles.admin)
  createFakeData() {
    this.materiasService.crearSetPruebas();
  }
}
