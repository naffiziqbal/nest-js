import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stragtey/jwt.strategy';
import { ProtectedAuthController } from './protected/auth.protected.controller';
import { ProtectedAuthService } from './protected/auth.protected.service';

@Module({
  controllers: [AuthController, ProtectedAuthController],
  providers: [AuthService, JwtStrategy, ProtectedAuthService],
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1hr',
      },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
