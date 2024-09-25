import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/core/enum/db.enum';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { CreateAdminLoginDto, SignupDto } from './dto/create-admin.dto';
import { UpdatedAdminLoginDto } from './dto/update-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(MODEL_NAME.ADMIN) private adminModel: Model<Admin>,
  ) {}

  findOne(obj: Partial<CreateAdminLoginDto>): Promise<any> {
    return this.adminModel.findOne(obj);
  }

  async validateUser(login: CreateAdminLoginDto) {
    if (login.email) {
      const user = await this.findOne({ email: login.email });
      if (user) {
        if (await bcrypt.compare(login.password, user.password)) return user;
        else throw new UnauthorizedException();
      } else throw new UnauthorizedException();
    }
  }

  createToken(id: string) {
    return this.jwtService.signAsync({ id });
  }

  createUser(signUpDto: SignupDto): Promise<CreateAdminLoginDto> {
    return this.adminModel.create(signUpDto);
  }

  findById(id: string): Promise<UpdatedAdminLoginDto> {
    return this.adminModel.findById(id);
  }
}
