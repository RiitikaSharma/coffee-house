import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString } from 'class-validator';
export class UpdatedBookingDto {
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

  @IsBoolean()
  @ApiProperty({ default: false })
  accepted: boolean;
}
