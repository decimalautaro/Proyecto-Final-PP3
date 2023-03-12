export interface  Alumno {
    _id?: string;
    nombre: string;
    apellido: string;
    dni: string;
    domicilio: string;
    fechaNacimiento: Date | undefined;
}
