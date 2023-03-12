import { IsEnum, IsNumber, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginatedDto } from '../../common/dtos/paginated.dto';
import { CondicionValida } from '../entities/curso.enums';

enum TypeEnum {
  and = 'and',
  or = 'or',
}

export class FindAllPagintedDto extends PaginatedDto {
  @IsOptional()
  @MinLength(1)
  @IsEnum(CondicionValida, {
    message:
      'Las posibilidades son: regular, promocion, libre, recursa, No aplica',
  })
  condicion?: CondicionValida;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  anio?: number;

  @IsOptional()
  @MinLength(1)
  @IsEnum(TypeEnum, { message: 'Possible values: and | or' })
  _type: 'and' | 'or';
}
