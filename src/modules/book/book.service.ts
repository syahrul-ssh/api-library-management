import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository, Like } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuditService } from '../audit-log/audit-log.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private auditService: AuditService,
  ) {}

  async create(createBookDto: CreateBookDto, userId: string): Promise<Book> {
    const book = this.booksRepository.create({
      ...createBookDto,
      availableCopies: createBookDto.totalCopies,
    });

    const savedBook = await this.booksRepository.save(book);

    this.auditService.log({
      userId,
      action: 'BOOK_CREATED',
      entity: 'Book',
      entityId: savedBook.id,
      newValue: savedBook,
    });

    return savedBook;
  }

  async findAll(query: any): Promise<{ data: Book[]; total: number }> {
    const { page = 1, limit = 10, search, category } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.title = Like(`%${search}%`);
    }
    
    if (category) {
      where.category = category;
    }

    const [data, total] = await this.booksRepository.findAndCount({
      where,
      take: limit,
      skip,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({ 
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto, userId: string): Promise<Book> {
    const book = await this.findOne(id);
    const oldValue = { ...book };

    Object.assign(book, {
      ...updateBookDto,
    });

    const updatedBook = await this.booksRepository.save(book);

    this.auditService.log({
      userId,
      action: 'BOOK_UPDATED',
      entity: 'Book',
      entityId: updatedBook.id,
      oldValue,
      newValue: updatedBook,
    });

    return updatedBook;
  }

  async remove(id: string, userId: string): Promise<void> {
    const book = await this.findOne(id);

    this.auditService.log({
      userId,
      action: 'BOOK_DELETED',
      entity: 'Book',
      entityId: book.id,
      oldValue: book,
    });

    await this.booksRepository.softRemove(book);
  }
}