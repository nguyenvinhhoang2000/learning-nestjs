import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  name: string;

  address: string;
}
