import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable({})
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.authModel.findOne({ email });
    console.log(user);
    return !!user;
  }

  async registerUser(data: {
    name: string;
    email: string;
    password: string;
    img: string;
  }) {
    const emailTaken = await this.emailExists(data.email);
    if (emailTaken) {
      throw new Error('Email is already in use');
    }

    const hashPassword = await this.hashPassword(data.password);

    const newUser = new this.authModel({
      email: data.email,
      name: data.name,
      password: hashPassword,
      img: data.img,
    });

    return newUser.save();
  }

  async comparePassword(
    plainPass: string,
    hashedPass: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPass, hashedPass);
  }

  async findUser(data: { email: string; password: string }) {
    const user = await this.authModel.findOne({ email: data.email }).exec();

    if (!user) {
      throw new Error('user not found');
    }

    const matchedUser = await this.comparePassword(
      data.password,
      user?.password ?? '',
    );

    if (!matchedUser) {
      throw new Error('password not matched');
    }
    return user;
  }
}
