import { IsIn, IsMongoId, IsString, MinLength } from 'class-validator';
import { Profesor } from 'src/profesores/entities/profesore.entity';

export class CreateMateriaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @MinLength(1)
  @IsMongoId()
  profesor: Profesor;

  @IsString()
  @MinLength(1)
  @IsIn(['anual', 'semestral'])
  duracion: string;

  @IsString()
  @MinLength(1)
  @IsIn(['regular', 'promocion', 'libre', 'recursa'])
  condicionMateria: string;
}
