import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

export class DbHelper<D, C = any, U = any> {
  constructor(private model: Model<D>) {}

  async create(obj: C, userId?: string) {
    if (userId) obj['userId'] = userId;
    return await this.model.create(obj);
  }

  findAll(filter: string = '') {
    const queryFilter = this.filterHandler(filter);
    return this.model.find(queryFilter);
  }

  async findById(id: string): Promise<D> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    } else {
      const user = await this.model.findById(id);
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    }
  }

  findOne(obj: Partial<D>): Promise<D & { _id: string }> {
    return this.model.findOne(obj);
  }

  async update(id: string, obj: U): Promise<D> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    } else {
      const user = await this.model.findByIdAndUpdate(id, obj, { new: true });
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    }
  }

  async remove(id: string): Promise<D> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id');
    } else {
      const user = await this.model.findByIdAndDelete(id);
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    }
  }

  private filterHandler(query: string) {
    try {
      const queryObj = JSON.parse(query);
      return queryObj;
    } catch (error) {
      return {};
    }
  }
}
