import { InjectModel } from '@nestjs/mongoose';
import { SessionData } from 'express-session';
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

  findAll(session: SessionData) {
    return this.menuItemModel.where({ venueId: session.venueId }).find().exec();
  }

  findById(id: string, session: SessionData) {
    return this.menuItemModel
      .where({ _id: id, venueId: session.venueId })
      .findOne()
      .exec();
  }

  create(createMenuItemDto: CreateMenuItemDto, session: SessionData) {
    const createMenuItem = new this.menuItemModel({
      ...createMenuItemDto,
      venueId: session.venueId,
    });
    return createMenuItem.save();
  }

  update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
    session: SessionData,
  ) {
    return this.menuItemModel
      .where({ _id: id, venueId: session.venueId })
      .findOneAndUpdate({}, updateMenuItemDto, { new: true })
      .exec();
  }

  remove(id: string, session: SessionData) {
    return this.menuItemModel
      .where({ _id: id, venueId: session.venueId })
      .findOneAndRemove()
      .exec();
  }
}
