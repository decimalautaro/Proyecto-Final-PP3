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
import { CarrerasService } from './carreras.service';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller()
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post(AppPath.CarrerasCreate)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  create(@Body() createCarreraDto: CreateCarreraDto) {
    return this.carrerasService.create(createCarreraDto);
  }

  @Get(AppPath.CarrerasFindAll)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() findAllDto: FindAllPagintedDto) {
    return this.carrerasService.findAll(findAllDto);
  }

  @Get(AppPath.CarrerasFindOne)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.carrerasService.findById(id);
  }

  @Patch(AppPath.CarrerasUpdate)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.carrerasService.update(id, updateCarreraDto);
  }

  @Delete(AppPath.CarrerasRemove)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.carrerasService.remove(id);
  }

  @Post(AppPath.CarrerasCreateFakeData)
  //@Auth(ValidRoles.admin)
  createFakeData() {
    this.carrerasService.crearSetPruebas();
  }
}
