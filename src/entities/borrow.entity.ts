import { BaseEntity } from 'src/utils/base/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

export enum BorrowingStatus {
  BORROWED = 'borrowed',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
}

@Entity('borrowings')
export class Borrowing extends BaseEntity {
  @ManyToOne(() => User, (user) => user.borrowings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ name: 'book_id' })
  bookId: string;

  @Column({ name: 'borrow_date', type: 'timestamp' })
  borrowDate: Date;

  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate: Date;

  @Column({ name: 'return_date', type: 'timestamp', nullable: true })
  returnDate?: Date;

  @Column({
    type: 'enum',
    enum: BorrowingStatus,
    default: BorrowingStatus.BORROWED,
  })
  status: BorrowingStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fee: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}