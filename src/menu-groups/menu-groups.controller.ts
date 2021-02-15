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

import { CreateMenuGroupDto } from './dto/create-menu-group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu-group.dto';
import { MenuGroupsService } from './menu-groups.service';
import { SessionGuard } from '../app.guard';

@Controller('menu-groups')
@UseGuards(SessionGuard)
export class MenuGroupsController {
  constructor(private readonly menuGroupsService: MenuGroupsService) {}

  @Post()
  create(@Body() createMenuGroupDto: CreateMenuGroupDto) {
    return this.menuGroupsService.create(createMenuGroupDto);
  }

  @Get()
  findAll() {
    return this.menuGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuGroupsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuGroupDto: UpdateMenuGroupDto,
  ) {
    return this.menuGroupsService.update(id, updateMenuGroupDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.menuGroupsService.delete(id);
  }
}
