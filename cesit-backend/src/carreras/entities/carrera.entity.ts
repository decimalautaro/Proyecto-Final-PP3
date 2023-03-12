import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Carrera extends Document {

    @Prop()
    nombre: string;


    @Prop()
    duracion: string;


    @Prop()
    horario: string;

    @Prop()
    plan: string;
}

export const CarreraSchema = SchemaFactory.createForClass(Carrera);