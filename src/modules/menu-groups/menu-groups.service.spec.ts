import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupsService } from './menu-groups.service';

describe('MenuGroupsService', () => {
  let service: MenuGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuGroupsService],
    }).compile();

    service = module.get<MenuGroupsService>(MenuGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
