import { AuthModule } from './../auth/auth.module';
import { Tarea, TareaSchema } from './entities/tarea.entity';
import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }]),
    AuthModule,
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
