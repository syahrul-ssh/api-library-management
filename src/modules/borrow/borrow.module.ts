import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Borrowing } from 'src/entities/borrow.entity';
import { BorrowingService } from './borrow.service';
import { BorrowingController } from './borrow.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrowing, Book]),
  ],
  providers: [BorrowingService],
  controllers: [BorrowingController],
})
export class BorrowingModule {}