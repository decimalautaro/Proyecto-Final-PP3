import { IsEnum, IsOptional, MinLength } from 'class-validator';
import { PaginatedDto } from '../../common/dtos/paginated.dto';

enum TypeEnum {
  and = 'and',
  or = 'or',
}

export class FindAllPagintedDto extends PaginatedDto {
  @IsOptional()
  @MinLength(1)
  apellido?: string;

  @IsOptional()
  @MinLength(1)
  nombre?: string;

  @IsOptional()
  @MinLength(1)
  dni?: string;

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
