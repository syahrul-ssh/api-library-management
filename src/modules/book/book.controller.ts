import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { BooksService } from './book.service';
import { BookSearchResult, ExternalApiService } from 'src/public-api/open-library-api/open-library-api.service';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { CurrentUser } from 'src/utils/decorator/user.decorator';

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  create(@Body() createBookDto: CreateBookDto, @CurrentUser() user: any) {
    return this.booksService.create(createBookDto, user.id);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.booksService.findAll(query);
  }

  @Get('search-external')
  async searchExternal(@Query('q') query: string): Promise<BookSearchResult[]> {
    return this.externalApiService.searchBooks(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @CurrentUser() user: any
  ) {
    return this.booksService.update(id, updateBookDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.booksService.remove(id, user.id);
  }
}