import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreDocument } from './model/store.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Store') private readonly model: Model<StoreDocument>,
  ) {}

  createRegistry(data: string) {
    this.model.create({ data: data });
    return `Registry  [${data}] created`!;
  }

  async getRegistries() {
    return await this.model.find().exec();
  }
}
