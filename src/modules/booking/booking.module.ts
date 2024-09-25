import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/core/enum/db.enum';
import { bookingDataSchema } from './entities/booking.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAME.BOOKING, schema: bookingDataSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
