import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop()
  data: string;
  static schema: any;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
