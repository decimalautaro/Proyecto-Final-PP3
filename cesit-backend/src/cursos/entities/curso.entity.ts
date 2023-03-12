import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

@Schema()
export class Curso extends Document {

    @Prop()
    anio: number;


    @Prop()
    cantidadAlumnos: number;


    @Prop()
    carrera: string;


    @Prop()
    bedelia: string;
}

export const CursoSchema = SchemaFactory.createForClass(Curso);