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
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FindAllPagintedDto } from './dto/find-all-cursos.dto';
import { Auth } from 'src/auth/decorators';

@Controller()
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post(AppPath.CursosCreate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get(AppPath.CursosFindAll)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() findAllDto: FindAllPagintedDto) {
    return this.cursosService.findAll(findAllDto);
  }

  @Get(AppPath.CursosFindOne)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.cursosService.findById(id);
  }

  @Patch(AppPath.CursosUpdate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateAlumnoDto);
  }

  @Delete(AppPath.CursosRemove)
  @Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.cursosService.remove(id);
  }

  @Post(AppPath.CursosCreateFakeData)
  @Auth(ValidRoles.admin)
  createFakeData() {
    this.cursosService.crearSetPruebas();
  }
}
