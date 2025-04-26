import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDTO } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateAuthDTO) {
    try {
      return await this.authService.registerUser(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Email is already in use') {
          throw new BadRequestException('Email is already taken');
        }
        throw error;
      }
    }
  }
  @Get('user')
  async findUser(@Body() data: { email: string; password: string }) {
    try {
      const user = await this.authService.login(data);
      return { user, message: ' user' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'user not found') {
          throw new NotFoundException('User Not found');
        } else if (error.message === 'password not matched') {
          throw new BadRequestException('Invalid password');
        }
        throw error;
      }
    }
  }
}
