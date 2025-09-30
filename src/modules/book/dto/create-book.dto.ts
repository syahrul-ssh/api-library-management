import { IsString, IsNumber, IsOptional, Min, IsUrl } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  publisher: string;

  @IsNumber()
  @Min(1000)
  publishedYear: number;

  @IsString()
  category: string;

  @IsNumber()
  @Min(1)
  totalCopies: number;

  @IsUrl()
  @IsOptional()
  coverImage?: string;
}