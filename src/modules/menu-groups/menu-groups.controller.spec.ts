import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupsController } from './menu-groups.controller';
import { MenuGroupsService } from './menu-groups.service';

describe('MenuGroupsController', () => {
  let controller: MenuGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuGroupsController],
      providers: [MenuGroupsService],
    }).compile();

    controller = module.get<MenuGroupsController>(MenuGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
