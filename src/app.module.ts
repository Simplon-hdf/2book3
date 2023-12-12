import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { EmployeesModule } from './employees/employees.module';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { HumanInformationsModule } from './human-informations/human-informations.module';
import { BorrowersModule } from './borrowers/borrowers.module';

@Module({
  imports: [EmployeesModule, BooksModule, BorrowsModule, HumanInformationsModule, BorrowersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
