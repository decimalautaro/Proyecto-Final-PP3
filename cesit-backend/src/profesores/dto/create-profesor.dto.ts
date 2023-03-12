
import { IsInt, IsString, MinLength } from "class-validator";

export class CreateProfesorDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;

    @IsString()
    @MinLength(1)
    dni: string;

    @IsInt()
    edad?: number;
}
