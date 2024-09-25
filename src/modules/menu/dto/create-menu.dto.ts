import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;
  @IsString()
  price: string;
  @IsString()
  description: string;
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: string[];
}
