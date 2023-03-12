import { IsEnum, IsObject, IsOptional, MinLength } from 'class-validator';
import { Profesor } from 'src/profesores/entities/profesore.entity';
import { PaginatedDto } from '../../common/dtos/paginated.dto';

enum TypeEnum {
  and = 'and',
  or = 'or',
}

export class FindAllPagintedDto extends PaginatedDto {
  @IsOptional()
  @MinLength(1)
  nombre?: string;

  @IsOptional()
  @IsObject()
  profesor?: Profesor;

  @IsOptional()
  @MinLength(1)
  duracion?: string;

  @IsOptional()
  @MinLength(1)
  condicionMateria?: string;

  @IsOptional()
  @MinLength(1)
  @IsEnum(TypeEnum, { message: 'Possible values: and | or' })
  _type: 'and' | 'or';

  // @IsOptional()
  // @IsBoolean()
  // @Type(() => Boolean)
  // finalizada?: boolean;

  // @IsOptional()
  // @Type(() => Number)
  // @Min(0)
  // @Max(100)
  // progreso?: number;
}
