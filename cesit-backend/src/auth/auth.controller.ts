import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { AUTH_ROUTES } from './constants/constants';
import { User } from './entities/user.entity';

@Controller(AUTH_ROUTES.root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.register)
  register(@Body() createUserDto: RegisterUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post(AUTH_ROUTES.login)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get(AUTH_ROUTES.checkOutStatus)
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get(AUTH_ROUTES.currentUser)
  @Auth()
  currentUser(@GetUser() user: User) {
    return this.authService.currentUser(user);
  }
}
