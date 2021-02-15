import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { MenuItem, MenuItemDocument } from './schemas/menu-item.schema';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>,
  ) {}

  findAll() {
    return this.menuItemModel.find().exec();
  }

  findOne(id: string) {
    return this.menuItemModel.findOne({ _id: id }).exec();
  }

  async create(createMenuItemDto: CreateMenuItemDto) {
    const createUser = new this.menuItemModel(createMenuItemDto);
    await createUser.save();
    return;
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    await this.menuItemModel.updateOne({ _id: id }, updateMenuItemDto).exec();
    return;
  }

  async delete(id: string) {
    await this.menuItemModel.deleteOne({ _id: id }).exec();
    return;
  }
}
