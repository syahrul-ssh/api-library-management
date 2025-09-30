import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PublicApiModule } from './public-api/public-api.module';
import { BooksModule } from './modules/book/book.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    PublicApiModule,
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
