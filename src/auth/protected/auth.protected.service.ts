import { Injectable } from '@nestjs/common';
import { Auth, AuthDocument } from '../auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({})
export class ProtectedAuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async getAllUsers() {
    return this.authModel.find();
  }
}
