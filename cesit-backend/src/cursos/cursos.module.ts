import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso, CursoSchema } from './entities/curso.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Curso.name, schema: CursoSchema }]),
    AuthModule,
  ],
  controllers: [CursosController],
  providers: [CursosService]
})
export class CursosModule { }
