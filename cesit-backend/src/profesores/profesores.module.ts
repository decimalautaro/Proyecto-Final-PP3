import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Profesor, ProfesorSchema } from './entities/profesore.entity';

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
