import { InjectModel } from '@nestjs/mongoose';
import { SessionData } from 'express-session';
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

  findAll(session: SessionData) {
    return this.menuGroupModel
      .where({ venueId: session.venueId })
      .find()
      .populate('menuItems')
      .exec();
  }

  findById(id: string, session: SessionData) {
    return this.menuGroupModel
      .where({ _id: id, venueId: session.venueId })
      .findOne()
      .populate('menuItems')
      .exec();
  }

  create(createMenuGroupDto: CreateMenuGroupDto, session: SessionData) {
    const createMenuGroup = new this.menuGroupModel({
      ...createMenuGroupDto,
      venueId: session.venueId,
    });
    return createMenuGroup.save();
  }

  update(
    id: string,
    updateMenuGroupDto: UpdateMenuGroupDto,
    session: SessionData,
  ) {
    return this.menuGroupModel
      .where({ _id: id, venueId: session.venueId })
      .findOneAndUpdate({}, updateMenuGroupDto, { new: true })
      .populate('menuItems')
      .exec();
  }

  remove(id: string, session: SessionData) {
    return this.menuGroupModel
      .where({ _id: id, venueId: session.venueId })
      .findOneAndDelete()
      .exec();
  }
}
