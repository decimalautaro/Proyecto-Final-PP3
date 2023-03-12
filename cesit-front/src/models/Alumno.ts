import { IDomicilio } from "./Domicilio";

export interface Alumno {
    _id?: string;
    nombre: string;
    apellido: string;
    dni: string;
    domicilio: IDomicilio[];
    fechaNacimiento: Date | undefined;
}
