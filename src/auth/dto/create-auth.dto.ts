import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDTO {
  @IsNotEmpty({ message: 'You should Provide your name' })
  name: string;

  @IsEmail({}, { message: 'You must enter your Email' })
  email: string;

  @IsNotEmpty({ message: 'Password Required' })
  @MinLength(6, { message: 'Password Should at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Image is Required' })
  img: string;
}
