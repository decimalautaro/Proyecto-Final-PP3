import { AppPath } from './../common/constants/path';
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
import { ValidRoles } from 'src/auth/interfaces';
import { AlumnosService } from './alumnos.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Auth } from 'src/auth/decorators';

@Controller()
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post(AppPath.AlumnosCreate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get(AppPath.AlumnosFindAll)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() findAllDto: FindAllPagintedDto) {
    return this.alumnosService.findAll(findAllDto);
  }

  @Get(AppPath.AlumnosFindOne)
  @Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.alumnosService.findById(id);
  }

  @Patch(AppPath.AlumnosUpdate)
  @Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnosService.update(id, updateAlumnoDto);
  }

  @Delete(AppPath.AlumnosRemove)
  @Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.alumnosService.remove(id);
  }

  @Post('fake-data')
  @Auth(ValidRoles.admin)
  createFakeData() {
    this.alumnosService.crearSetPruebas();
  }
}
