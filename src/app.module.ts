import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

import { config } from 'dotenv';
import { AppController } from './app.controller';
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
