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
          name: createBookDto.name,
          description: createBookDto.description,
          author: {
            connect: {
              UUID: createBookDto.author_UUID,
            },
          },
          borrow: createBookDto.borrow_UUID ? {
            connect: {
              UUID: createBookDto.borrow_UUID,
            },
          } : undefined,
        },
      }),
    );
    return createBook.toJSON();
  }

  public async updateByUUID(uuid: string, updateBookDto: UpdateBookDto) {
    const updateBook = new NormalizedResponse(
      `Book has been updated`,
      await this.prisma.books.update({
        where: {
          UUID: uuid,
        },
        data: {
          name: updateBookDto.name,
          description: updateBookDto.description,
        },
      }),
    );
    return updateBook.toJSON();
  }

  public async getByUUID(uuid: string) {
    const getBook = new NormalizedResponse(
      `Book with UUID ${uuid} has been retrieved`,
      await this.prisma.books.findUnique({
        where: {
          UUID: uuid,
        },
      }),
    );
    return getBook.toJSON();
  }

  public async deleteByUUID(uuid: string) {
    const deleteBook = new NormalizedResponse(
      `Book with UUID ${uuid} has been deleted`,
      await this.prisma.books.delete({
        where: {
          UUID: uuid,
        },
      }),
    );
    return deleteBook.toJSON();
  }
}
