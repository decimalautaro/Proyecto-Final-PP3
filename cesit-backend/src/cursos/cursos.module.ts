import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso, CursoSchema } from './entities/curso.entity';
import { AuthModule } from '../auth/auth.module';
import { Alumno, AlumnoSchema } from '../alumnos/entities/alumno.entity';
import { Materia, MateriaSchema } from '../materias/entities/materia.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Curso.name, schema: CursoSchema },
      { name: Alumno.name, schema: AlumnoSchema },
      { name: Materia.name, schema: MateriaSchema },
    ]),
    AuthModule,
  ],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
