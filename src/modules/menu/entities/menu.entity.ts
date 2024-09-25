import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MenuData {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    required: false,
    default: new Date().toDateString(),
  })
  createdAt: string;

  @Prop({
    required: false,
    default: new Date().toDateString(),
  })
  updatedAt: string;

  @Prop()
  images: string[];
}

export const menuDataSchema = SchemaFactory.createForClass(MenuData);
menuDataSchema.pre('findOneAndUpdate', async function (next) {
  this['_update'].updatedAt = new Date().toISOString();
  next();
});
