import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carrera, CarreraSchema } from './entities/carrera.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Carrera.name, schema: CarreraSchema }]),
    AuthModule,
  ],
  controllers: [CarrerasController],
  providers: [CarrerasService]
})
export class CarrerasModule { }
