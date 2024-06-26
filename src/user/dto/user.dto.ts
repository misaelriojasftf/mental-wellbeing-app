import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
  }
  
  export class LoginUserDto {
    @IsString()
    email: string;
    
    @IsNotEmpty()
    password: string;
  }
  