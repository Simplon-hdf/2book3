import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized.response';
@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) { }





  
  public async getByUUID(uuid: string) {
    const getBook = new NormalizedResponse(
      `Borrower ${uuid} has been get`,
      await this.prisma.book.findUnique({
        where: {
          UUID: uuid,
        },
      }),
    );
    return getBook.toJSON();
  };

  public async deleteByUUID(uuid: string) {
    const deleteBook = new NormalizedResponse(
      `Borrower ${uuid} has been delete`,
      await this.prisma.books.delete({
        where: {
          UUID: uuid,
        },
      }),
    );
    return deleteBook.toJSON();
  };
}
