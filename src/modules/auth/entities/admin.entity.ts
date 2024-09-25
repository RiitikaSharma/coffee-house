import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class Admin {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: false,
    default: new Date().toISOString(),
  })
  createAt: string;

  @Prop({
    required: true,
    default: new Date().toISOString(),
  })
  updateAt: string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);

adminSchema.pre('findOneAndUpdate', async function (next) {
  this['_update'].updateAt = new Date().toISOString();
  next();
});

adminSchema.pre('save', async function (next) {
  const saltOrRounds = 10;
  this.password = await bcrypt.hash(this.password, saltOrRounds);
  next();
});
