import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Materia extends Document {

    @Prop()
    nombre: string;


    @Prop()
    profesor: string;


    @Prop()
    duracion: string;


    @Prop()
    condicionMateria: string;

}

export const MateriaSchema = SchemaFactory.createForClass(Materia);
