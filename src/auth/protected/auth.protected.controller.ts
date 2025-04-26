import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.jwt-gaurds';
import { ProtectedAuthService } from './auth.protected.service';

@Controller('auth/protected')
@UseGuards(JwtAuthGuard)
export class ProtectedAuthController {
  constructor(private readonly protectedAuthService: ProtectedAuthService) {}
  @Get('users')
  async getAllUsers() {
    return await this.protectedAuthService.getAllUsers();
  }
}
