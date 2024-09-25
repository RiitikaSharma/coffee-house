import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdatedAdminLoginDto {
  @IsString()
  _id: ObjectId;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;
  @IsString()
  createdAt: string;
  @IsString()
  updatedAt: string;
}
