import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Materia, MateriaSchema } from './entities/materia.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Materia.name, schema: MateriaSchema }]),
    AuthModule,
  ],
  controllers: [MateriasController],
  providers: [MateriasService]
})
export class MateriasModule { }
