import { IsNotEmpty, IsString } from 'class-validator';

import { MenuItem } from '../../menu-items/schemas/menu-item.schema';

export class CreateMenuGroupDto {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  description: string;

  @IsString({ each: true })
  menuItems: MenuItem[] = [];
}
