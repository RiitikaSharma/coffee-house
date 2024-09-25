import { Injectable } from '@nestjs/common';
import { DbHelper } from 'src/core/helper/db.helper';
import { BookingData } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdatedBookingDto } from './dto/update-booking.dto';
import { MODEL_NAME } from 'src/core/enum/db.enum';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookingService extends DbHelper<
  BookingData,
  CreateBookingDto,
  UpdatedBookingDto
> {
  constructor(
    @InjectModel(MODEL_NAME.BOOKING) private bookingModel: Model<BookingData>,
  ) {
    super(bookingModel);
  }

  async findFilteredBookings(filterDate: string) {
    const startTime = new Date(filterDate);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Adding one hour to start time
    const user = await this.bookingModel.find({
      date: {
        $gte: startTime, // Find bookings after or at the start time
        $lt: endTime, // Find bookings before the end time
      },
    });
    return user;
  }
}
