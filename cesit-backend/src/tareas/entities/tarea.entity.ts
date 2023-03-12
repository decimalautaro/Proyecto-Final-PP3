import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tarea extends Document {
  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  finalizada: boolean;

  @Prop()
  fechaLimite?: Date | undefined;

  @Prop()
  progreso: number;

  @Prop()
  asignado: string;

  @Prop()
  roles: string;
}

export const TareaSchema = SchemaFactory.createForClass(Tarea);
