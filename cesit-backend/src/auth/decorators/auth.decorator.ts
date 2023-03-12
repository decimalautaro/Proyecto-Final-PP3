import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from './../interfaces/valid-roles.interface';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export const META_ROLES = 'roles';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
