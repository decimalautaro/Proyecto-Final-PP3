import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTareaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsBoolean()
  finalizada: boolean;

  @IsDate()
  @Type(() => Date)
  fechaLimite?: Date | undefined;

  @IsNumber()
  @Min(0)
  @Max(100)
  progreso: number;

  @IsString()
  @MinLength(1)
  asignado: string;

  @IsString()
  // @MinLength(1)
  roles: string;
}
