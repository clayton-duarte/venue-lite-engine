import {
  Controller,
  UseGuards,
  Session,
  Delete,
  Param,
  Post,
  Body,
  Put,
  Get,
} from '@nestjs/common';
import { SessionData } from 'express-session';

import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { SessionGuard } from '../../guards/session.guard';
import { MenuItemsService } from './menu-items.service';

@Controller('menu-items')
@UseGuards(SessionGuard)
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  findAll(@Session() session: SessionData) {
    return this.menuItemsService.findAll(session);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Session() session: SessionData) {
    return this.menuItemsService.findById(id, session);
  }

  @Post()
  create(
    @Body(new FormatCurrencyPipe()) createMenuItemDto: CreateMenuItemDto,
    @Session() session: SessionData,
  ) {
    return this.menuItemsService.create(createMenuItemDto, session);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new FormatCurrencyPipe()) updateMenuItemDto: UpdateMenuItemDto,
    @Session() session: SessionData,
  ) {
    return this.menuItemsService.update(id, updateMenuItemDto, session);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: SessionData) {
    return this.menuItemsService.remove(id, session);
  }
}
