
import { IsIn, IsString, MinLength } from "class-validator";

export class CreateCarreraDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    duracion: string;

    @IsString()
    @MinLength(1)
    @IsIn(['manana', 'tarde', 'noche'])
    horario: string;

    @IsString()
    @MinLength(1)
    plan: string;


}
