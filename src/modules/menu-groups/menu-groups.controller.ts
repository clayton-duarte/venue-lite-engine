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

import { CreateMenuGroupDto } from './dto/create-menu-group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu-group.dto';
import { MenuGroupsService } from './menu-groups.service';
import { SessionGuard } from '../../guards/session.guard';

@Controller('menu-groups')
@UseGuards(SessionGuard)
export class MenuGroupsController {
  constructor(private readonly menuGroupsService: MenuGroupsService) {}

  @Get()
  findAll(@Session() session: SessionData) {
    return this.menuGroupsService.findAll(session);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Session() session: SessionData) {
    return this.menuGroupsService.findById(id, session);
  }

  @Post()
  create(
    @Body() createMenuGroupDto: CreateMenuGroupDto,
    @Session() session: SessionData,
  ) {
    return this.menuGroupsService.create(createMenuGroupDto, session);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuGroupDto: UpdateMenuGroupDto,
    @Session() session: SessionData,
  ) {
    return this.menuGroupsService.update(id, updateMenuGroupDto, session);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: SessionData) {
    return this.menuGroupsService.remove(id, session);
  }
}
