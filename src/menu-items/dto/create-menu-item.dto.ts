import { IsNotEmpty } from 'class-validator';

export class CreateMenuItemDto {
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  price: string;
}
