

import { IsIn, IsString, MinLength } from "class-validator";

export class CreateMateriaDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    profesor: string;

    @IsString()
    @MinLength(1)
    duracion: string;

    @IsString()
    @MinLength(1)
    @IsIn(['regular', 'promocion', 'libre', 'recursa'])
    condicionMateria: string;

}
