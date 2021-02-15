import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { MenuGroup, MenuGroupDocument } from './schemas/menu-group.schema';
import { CreateMenuGroupDto } from './dto/create-menu-group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu-group.dto';

@Injectable()
export class MenuGroupsService {
  constructor(
    @InjectModel(MenuGroup.name)
    private menuGroupModel: Model<MenuGroupDocument>,
  ) {}

  findAll() {
    return this.menuGroupModel.find().populate('menuItems').exec();
  }

  findById(id: string) {
    return this.menuGroupModel.findById(id).populate('menuItems').exec();
  }

  create(createMenuGroupDto: CreateMenuGroupDto) {
    const createMenuGroup = new this.menuGroupModel(createMenuGroupDto);
    return createMenuGroup.save();
  }

  update(id: string, updateMenuGroupDto: UpdateMenuGroupDto) {
    return this.menuGroupModel
      .findByIdAndUpdate(id, updateMenuGroupDto, { new: true })
      .populate('menuItems')
      .exec();
  }

  remove(id: string) {
    return this.menuGroupModel.findByIdAndRemove(id).exec();
  }
}
