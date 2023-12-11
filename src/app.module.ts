import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [EmployeesModule, BooksModule, BorrowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
