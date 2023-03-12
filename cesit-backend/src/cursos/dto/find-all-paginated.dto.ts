

import {
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { PaginatedDto } from '../../common/dtos/paginated.dto';

enum TypeEnum {
  and = 'and',
  or = 'or',
}

export class FindAllPagintedDto extends PaginatedDto {

  @IsOptional()
  @MinLength(1)
  carrera?: string;


  @IsOptional()
  @MinLength(1)
  bedelia?: string;


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
