import { IsInt, IsString, IsMongoId, IsOptional } from 'class-validator';
import { CondicionValida } from '../entities/curso.enums';

export class CreateCursoDto {
  @IsInt()
  anio: number;

  @IsInt()
  nota = 0;

  @IsInt()
  presentismo = 0;

  @IsString()
  condicion: CondicionValida = CondicionValida.NoAplica;

  @IsOptional()
  @IsString()
  @IsMongoId()
  alumno?: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  materia?: string;
}
