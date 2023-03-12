
import { IsInt, IsString, MinLength } from "class-validator";

export class CreateCursoDto {

    @IsInt()
    anio: number;

    @IsInt()
    cantidadAlumnos: number;

    @IsString()
    @MinLength(1)
    carrera: string;

    @IsString()
    @MinLength(1)
    bedelia: string;


}
