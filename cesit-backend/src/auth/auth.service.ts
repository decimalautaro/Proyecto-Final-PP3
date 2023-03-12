import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterUserDto, LoginUserDto } from './dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userRepository: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: RegisterUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      const userToRes = user.toJSON();
      delete userToRes.password;

      return {
        ...userToRes,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository
      .findOne({
        email,
      })
      .select('email password _id');

    if (!user) {
      throw new UnauthorizedException('Credentailas are not valid');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentailas are not valid');
    }

    const userToResp = user.toJSON();
    delete userToResp.password;

    return {
      ...userToResp,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async currentUser(user: User) {
    const userToResp = user.toJSON();
    delete userToResp.password;
    delete userToResp.__v;

    return userToResp;
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleErrors(error: any) {
    console.error('--> handle error <--');
    console.error(error);
    if (error.code === 11000) {
      throw new BadRequestException(
        `El usuario ya existe existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    throw new InternalServerErrorException(`Error en auth`);
  }
}
