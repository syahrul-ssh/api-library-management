import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateBorrowingDto {
  @IsUUID()
  bookId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}