import { AppPath } from './../common/constants/path';
import { ValidRoles } from './../auth/interfaces/valid-roles.interface';
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
import { TareasService } from './tareas.service';
import { FindAllPagintedDto } from './dto/find-all-paginated.dto';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Auth } from 'src/auth/decorators';

@Controller()
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post(AppPath.TareasCreate)
  // @Auth(ValidRoles.admin, ValidRoles.user)
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @Get(AppPath.TareasFindAll)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() findAllDto: FindAllPagintedDto) {
    return this.tareasService.findAll(findAllDto);
  }

  @Get(AppPath.TareasFindOne)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  findOne(@Param('id') id: string) {
    return this.tareasService.findById(id);
  }

  @Patch(AppPath.TareasUpdate)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Delete(AppPath.TareasRemove)
  //@Auth(ValidRoles.admin, ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.tareasService.remove(id);
  }

  @Post(AppPath.AlumnosCreateFakeData)
  //@Auth(ValidRoles.admin)
  createFakeData() {
    this.tareasService.crearSetProuebas();
  }
}
