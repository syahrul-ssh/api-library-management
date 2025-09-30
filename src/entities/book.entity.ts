import { BaseEntity } from 'src/utils/base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Borrowing } from './borrow.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ unique: true })
  isbn: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  publisher: string;

  @Column({ name: 'published_year' })
  publishedYear: number;

  @Column()
  category: string;

  @Column({ name: 'total_copies', default: 1 })
  totalCopies: number;

  @Column({ name: 'available_copies', default: 1 })
  availableCopies: number;

  @Column({ name: 'cover_image', nullable: true })
  coverImage?: string;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings: Borrowing[];
}