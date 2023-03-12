import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { IDomicilio } from '../interfaces/Domicilio';

@Schema()
export class Alumno extends Document {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  dni: string;

  @Prop()
  domicilio: IDomicilio[];

  @Prop()
  fechaNacimiento: Date | undefined;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);
