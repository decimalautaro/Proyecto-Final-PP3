
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'El password debe contener algún caracter en mayúscula, minúscula y un número',
  })
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;



  // Los usuarios cuando se registran no deberían setear ningún role
  // @IsArray()
  // @IsEnum(ValidRoles, { each: true })
  // roles: ValidRoles[];
}
