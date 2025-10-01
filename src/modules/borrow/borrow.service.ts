import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Borrowing, BorrowingStatus } from 'src/entities/borrow.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateBorrowingDto } from './dto/create-borrow.dto';
import { AuditService } from '../audit-log/audit-log.service';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingRepository: Repository<Borrowing>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private dataSource: DataSource,
    private auditService: AuditService,
  ) {}

  async create(createBorrowingDto: CreateBorrowingDto, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const book = await queryRunner.manager.findOne(Book, {
        where: { id: createBorrowingDto.bookId },
      });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      if (book.availableCopies <= 0) {
        throw new BadRequestException('No copies available');
      }

      const borrowing = queryRunner.manager.create(Borrowing, {
        ...createBorrowingDto,
        userId,
        borrowDate: new Date(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: BorrowingStatus.BORROWED,
      });

      await queryRunner.manager.save(borrowing);

      book.availableCopies -= 1;
      await queryRunner.manager.save(book);

      await queryRunner.commitTransaction();

      this.auditService.log({
        userId,
        action: 'BOOK_BORROWED',
        entity: 'Borrowing',
        entityId: borrowing.id,
        newValue: { bookId: book.id, bookTitle: book.title },
      });

      return borrowing;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async returnBook(id: string, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const borrowing = await queryRunner.manager.findOne(Borrowing, {
        where: { id },
        relations: ['book'],
      });

      if (!borrowing) {
        throw new NotFoundException('Borrowing record not found');
      }

      if (borrowing.status === BorrowingStatus.RETURNED) {
        throw new BadRequestException('Book already returned');
      }

      const returnDate = new Date();
      const overdueDays = Math.max(
        0,
        Math.floor((returnDate.getTime() - borrowing.dueDate.getTime()) / (1000 * 60 * 60 * 24))
      );

      const fee = overdueDays * 1000;

      borrowing.returnDate = returnDate;
      borrowing.status = overdueDays > 0 ? BorrowingStatus.OVERDUE : BorrowingStatus.RETURNED;
      borrowing.fee = fee;

      await queryRunner.manager.save(borrowing);

      const book = borrowing.book;
      book.availableCopies += 1;
      await queryRunner.manager.save(book);

      await queryRunner.commitTransaction();

      this.auditService.log({
        userId,
        action: 'BOOK_RETURNED',
        entity: 'Borrowing',
        entityId: borrowing.id,
        newValue: { fee, overdueDays },
      });

      return borrowing;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}