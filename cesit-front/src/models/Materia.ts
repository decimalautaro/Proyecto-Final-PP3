import { Profesor } from "./Profesor";

export interface Materia {
    _id?: string,
    nombre: string,
    profesor: Profesor,
    duracion: string,
    condicionMateria: string
}