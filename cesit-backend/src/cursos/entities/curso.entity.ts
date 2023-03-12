import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Alumno } from '../../alumnos/entities/alumno.entity';
import { Materia } from '../../materias/entities/materia.entity';
import { CondicionValida } from './curso.enums';

@Schema()
export class Curso extends Document {
  @Prop({ type: Number, required: true })
  anio: number;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(CondicionValida),
  })
  condicion: CondicionValida;

  @Prop()
  nota: number;

  @Prop()
  presentismo: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: false,
  })
  alumno: Alumno;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: false,
  })
  materia: Materia;
}

export const CursoSchema = SchemaFactory.createForClass(Curso);
