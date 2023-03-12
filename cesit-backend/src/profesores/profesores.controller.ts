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
import { ProfesoresService } from './profesores.service';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesore.dto';
import { Auth } from 'src/auth/decorators';

@Controller()
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post(AppPath.ProfesoresCreate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesoresService.create(createProfesorDto);
  }

  @Get(AppPath.ProfesoresFindAll)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() findAllDto: FindAllPagintedDto) {
    return this.profesoresService.findAll(findAllDto);
  }

  @Get(AppPath.ProfesoresFindOne)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.profesoresService.findById(id);
  }

  @Patch(AppPath.ProfesoresUpdate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
    return this.profesoresService.update(id, updateProfesorDto);
  }

  @Delete(AppPath.ProfesoresRemove)
  @Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.profesoresService.remove(id);
  }

  @Post(AppPath.ProfesoresCreateFakeData)
  @Auth(ValidRoles.admin)
  createFakeData() {
    this.profesoresService.crearSetPruebas();
  }
}
