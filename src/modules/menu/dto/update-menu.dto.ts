import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedMenuDto {
  @IsString()
  name: string;
  @IsString()
  price: string;

  @IsString()
  description: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  images: string[];
}
