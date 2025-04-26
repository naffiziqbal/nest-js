import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorators';
import { JwtAuthGuard } from '../guards/auth.jwt-gaurds';
import { ProtectedAuthService } from './auth.protected.service';

@Controller('auth/protected')
@UseGuards(JwtAuthGuard)
export class ProtectedAuthController {
  constructor(private readonly protectedAuthService: ProtectedAuthService) {}
  @Get('users')
  async getAllUsers() {
    const users = await this.protectedAuthService.getAllUsers();
    if (!users.length) {
      throw new BadRequestException('No Data Found');
    }
    return users;
  }

  @Get('user')
  findOne(@User() user: { id: string; email: string }) {
    console.log(user);
    return user;
  }
}
