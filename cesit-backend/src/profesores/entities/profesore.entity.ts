import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profesor extends Document {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  dni: string;

  @Prop()
  fechaNacimiento: Date | undefined;
}

export const ProfesorSchema = SchemaFactory.createForClass(Profesor);
