import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "src/entities/user.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Invalid role' })
  role: UserRole;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
