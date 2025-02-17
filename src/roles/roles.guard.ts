import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token = req.get('Authorization');

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const user = await this.userModel.findOne({ token });

    if (!user) {
      throw new UnauthorizedException(
        'User is not found with the provided token',
      );
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('User is not an admin');
    }

    return true;
  }
}
