import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BookingData {
  @Prop({ required: true })
  tableNo: string;
  @Prop({ required: true })
  customerName: string;
  @Prop({ required: true, type: Date })
  date: Date;
  @Prop({ required: true })
  time: string;
  @Prop({ required: false, default: false })
  accepted: boolean;
  @Prop({
    required: false,
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop({
    required: false,
    default: new Date().toISOString(),
  })
  updatedAt: string;
}

export const bookingDataSchema = SchemaFactory.createForClass(BookingData);

bookingDataSchema.pre('findOneAndUpdate', async function (next) {
  this['_update'].updatedAt = new Date().toISOString();
  next();
});
