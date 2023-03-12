import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Profesor } from 'src/profesores/entities/profesore.entity';

@Schema()
export class Materia extends Document {
  @Prop()
  nombre: string;

  @Prop()
  duracion: string;

  @Prop()
  condicionMateria: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
  })
  profesor: Profesor;
}

export const MateriaSchema = SchemaFactory.createForClass(Materia);
