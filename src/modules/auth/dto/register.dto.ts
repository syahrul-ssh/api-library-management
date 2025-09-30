import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/entities/user.entity";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsEnum(UserRole, { message: 'Invalid role' })
  role: UserRole;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}