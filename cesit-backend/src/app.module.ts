import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TareasModule } from './tareas/tareas.module';
import { CommonModule } from './common/common.module';
import { CarrerasModule } from './carreras/carreras.module';
import { CursosModule } from './cursos/cursos.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { MateriasModule } from './materias/materias.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONN),
    TareasModule,
    AuthModule,
    CommonModule,
    CarrerasModule,
    CursosModule,
    ProfesoresModule,
    AlumnosModule,
    MateriasModule,
  ],
})
export class AppModule {}
