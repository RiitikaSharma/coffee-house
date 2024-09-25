import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/core/guard/jwt.guard';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdatedMenuDto } from './dto/update-menu.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('menu')
@ApiTags('Menu')
@UseGuards(JWTGuard)
@ApiBearerAuth()
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', undefined, {
      dest: 'public/image',
      storage: diskStorage({
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
        destination: (req, file, cb) => {
          return cb(null, 'public/image');
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFiles() image: Array<Express.Multer.File>,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    if (!image?.length) {
      throw new BadRequestException('Image not found');
    }
    const images = image.map(
      (image) => `http://localhost:3000/image/${image.originalname}`,
    );

    const menu = await this.menuService.create({
      name: createMenuDto.name,
      price: createMenuDto.price,
      description: createMenuDto.description,
      images,
    });
    return menu;
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', undefined, {
      dest: 'public/image',
      storage: diskStorage({
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
        destination: (req, file, cb) => {
          return cb(null, 'public/image');
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @UploadedFiles() image: Array<Express.Multer.File>,
    @Body() updatedMenuDto: UpdatedMenuDto,
  ) {
    if (image.length) {
      const images = image.map(
        (image) => `http://localhost:3000/image/${image.originalname}`,
      );
      return this.menuService.update(id, { ...updatedMenuDto, images });
    } else {
      return this.menuService.update(id, updatedMenuDto);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
