import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL_NAME } from 'src/core/enum/db.enum';
import { menuDataSchema } from './entities/menu.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MODEL_NAME.MENU, schema: menuDataSchema },
    ]),
    MulterModule.register(),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
