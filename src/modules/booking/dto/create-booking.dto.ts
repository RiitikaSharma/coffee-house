import { IsDateString, IsString } from 'class-validator';
export class CreateBookingDto {
  @IsString()
  tableNo: string;

  @IsString()
  customerName: string;
  @IsString()
  customerNumber: string;

  @IsDateString()
  date: Date;

  @IsString()
  time: string;
}
