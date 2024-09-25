import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MODEL_NAME } from 'src/core/enum/db.enum';
import { MenuData } from './entities/menu.entity';
import { DbHelper } from 'src/core/helper/db.helper';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdatedMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService extends DbHelper<
  MenuData,
  CreateMenuDto,
  UpdatedMenuDto
> {
  constructor(@InjectModel(MODEL_NAME.MENU) menuModel: Model<MenuData>) {
    super(menuModel);
  }
}
