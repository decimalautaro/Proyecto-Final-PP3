import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString, MinLength } from 'class-validator';
import { Materia } from 'src/materias/entities/materia.entity';

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

  @IsDate()
  @Type(() => Date)
  fechaNacimiento: Date | undefined;
}
