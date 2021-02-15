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
    return this.menuGroupModel.find().exec();
  }

  findOne(id: string) {
    return this.menuGroupModel.findOne({ _id: id }).exec();
  }

  async create(createMenuGroupDto: CreateMenuGroupDto) {
    const createUser = new this.menuGroupModel(createMenuGroupDto);
    await createUser.save();
    return;
  }

  async update(id: string, updateMenuGroupDto: UpdateMenuGroupDto) {
    await this.menuGroupModel.updateOne({ _id: id }, updateMenuGroupDto).exec();
    return;
  }

  async delete(id: string) {
    await this.menuGroupModel.deleteOne({ _id: id }).exec();
    return;
  }
}
