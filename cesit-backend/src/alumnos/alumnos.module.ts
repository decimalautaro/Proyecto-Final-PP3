import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumno, AlumnoSchema } from './entities/alumno.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alumno.name, schema: AlumnoSchema }]),
    AuthModule,
  ],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
