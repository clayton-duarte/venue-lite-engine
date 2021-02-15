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
import { SessionGuard } from '../../guards/session.guard';

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
  findById(@Param('id') id: string) {
    return this.menuGroupsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuGroupDto: UpdateMenuGroupDto,
  ) {
    return this.menuGroupsService.update(id, updateMenuGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuGroupsService.remove(id);
  }
}
