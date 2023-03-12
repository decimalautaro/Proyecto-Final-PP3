import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profesor, ProfesorSchema } from './entities/profesores.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profesor.name, schema: ProfesorSchema }]),
    AuthModule,
  ],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports: [ProfesoresService],
})
export class ProfesoresModule {}
