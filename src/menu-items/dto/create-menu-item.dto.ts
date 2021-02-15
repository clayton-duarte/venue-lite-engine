import { IsNotEmpty, Matches } from 'class-validator';

export class CreateMenuItemDto {
  @IsNotEmpty()
  label: string;

  @Matches(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/, {
    message: 'price must match the 9,999.99 format',
  })
  price: string;
}
