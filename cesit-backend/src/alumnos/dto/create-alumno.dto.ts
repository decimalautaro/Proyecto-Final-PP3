import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  maxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IDomicilio } from '../interfaces/Domicilio';

export class Domicilio {
  @IsString()
  calle: string;

  @IsString()
  numero: string;

  @IsString()
  localidad: string;

  @IsString()
  provincia: string;

  @IsString()
  @IsOptional()
  referencia?: string;
}

export class CreateAlumnoDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  apellido: string;

  @IsString()
  @MinLength(1)
  @MaxLength(8)
  dni: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Domicilio)
  domicilio: IDomicilio[];

  @IsDate()
  @Type(() => Date)
  fechaNacimiento: Date | undefined;
}
