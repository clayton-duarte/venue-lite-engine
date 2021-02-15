import {
  Controller,
  UseGuards,
  Delete,
  Param,
  Post,
  Body,
  Put,
  Get,
} from '@nestjs/common';

import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemsService } from './menu-items.service';
import { SessionGuard } from '../app.guard';

@Controller('menu-items')
@UseGuards(SessionGuard)
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.menuItemsService.findById(id);
  }

  @Post()
  create(@Body(new FormatCurrencyPipe()) createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new FormatCurrencyPipe()) updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(id);
  }
}
