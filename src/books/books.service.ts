import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized.response';


@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(createBookDto: CreateBookDto) {
    const createBook = new NormalizedResponse(
      `Book ${createBookDto.name} has been created`,
      await this.prisma.books.create({
        data: {
          uuid: createBookDto.UUID,
          name: createBookDto.name,
          description: createBookDto.description,
          author_UUID: {
            connect: {
              author_UUID: createBookDto.author_UUID,
            },
          },
          borrow_UUID: {
            connect: {
              borrow_UUID: createBookDto.borrow_UUID,
            },
          }
        },
      },
      )
    );
    return createBook.toJSON();
  }

  public async updateByUUID(updateBookDto: UpdateBookDto) {
    const updateBook = new NormalizedResponse(
      `Book has been update`,
      await this.prisma.borrowers.update({
        Where: {
          uuid: updateBookDto.UUID,
        },
        data: {
          name: updateBookDto.name,
          description: updateBookDto.description,
        }
      }
      ),
    );
    return updateBook.toJSON();
  };

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