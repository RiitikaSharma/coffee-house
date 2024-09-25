import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { DuplicateKeyExceptionFilter } from 'src/core/filter/duplicate-email.filter';
import { CreateAdminLoginDto, SignupDto } from './dto/create-admin.dto';
import { adminUser } from 'src/core/decorator/admin.decorator';

@Controller('auth')
@ApiTags('Authorization')
@ApiForbiddenResponse({ description: 'Forbidden.' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @adminUser() user: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _body: CreateAdminLoginDto,
  ): Promise<any> {
    const token = await this.authService.createToken(user._id);
    return { user, token };
  }

  @Post('register')
  @UseFilters(DuplicateKeyExceptionFilter)
  register(@Body() req: SignupDto) {
    return this.authService.createUser(req);
  }
}
