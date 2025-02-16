import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { User, UserDocument } from '../schemas/user.schema';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@InjectModel(User.name) private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const user: UserDocument = request.user as UserDocument;
    return requiredRoles.some((roles) => user.role.includes(roles));
  }
}
