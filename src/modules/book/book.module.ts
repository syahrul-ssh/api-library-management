import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { PublicApiModule } from 'src/public-api/public-api.module';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { AuditModule } from '../audit-log/audit-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    PublicApiModule,
    AuditModule
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}