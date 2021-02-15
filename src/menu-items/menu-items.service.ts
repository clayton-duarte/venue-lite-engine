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

  findById(id: string) {
    return this.menuItemModel.findById(id).exec();
  }

  create(createMenuItemDto: CreateMenuItemDto) {
    const createMenuItem = new this.menuItemModel(createMenuItemDto);
    return createMenuItem.save();
  }

  update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemModel
      .findByIdAndUpdate(id, updateMenuItemDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.menuItemModel.findByIdAndRemove(id).exec();
  }
}
