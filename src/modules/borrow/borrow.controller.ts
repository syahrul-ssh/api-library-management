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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { BorrowingService } from './borrow.service';
import { UserRole } from 'src/entities/user.entity';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { CreateBorrowingDto } from './dto/create-borrow.dto';
import { CurrentUser } from 'src/utils/decorator/user.decorator';

@Controller('borrowings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  @Roles(UserRole.MEMBER, UserRole.LIBRARIAN, UserRole.ADMIN)
  create(
    @Body() createBorrowingDto: CreateBorrowingDto,
    @CurrentUser() user: any,
  ) {
    return this.borrowingService.create(createBorrowingDto, user.id);
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: string, @CurrentUser() user: any) {
    return this.borrowingService.returnBook(id, user.id);
  }
}