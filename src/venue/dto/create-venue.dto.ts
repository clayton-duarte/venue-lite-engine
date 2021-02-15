import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateVenueDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
