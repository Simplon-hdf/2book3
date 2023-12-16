import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a book', description: 'Add a new book to the database' })
  public async create(@Body() createBookDto: CreateBookDto) {
    try {
      return await this.booksService.create(createBookDto);
    } catch (error) {
      throw new HttpException('Failed to create book', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get book by UUID', description: 'Retrieve a book using its UUID' })
  public async getByUUID(@Param('uuid') uuid: string) {
    try {
      return await this.booksService.getByUUID(uuid);
    } catch (error) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update book information', description: 'Update a book\'s information using its UUID' })
  public async updateByUUID(@Param('uuid') uuid: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return await this.booksService.updateByUUID(uuid, updateBookDto);
    } catch (error) {
      throw new HttpException('Failed to update book', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a book', description: 'Remove a book from the database using its UUID' })
  public async deleteByUUID(@Param('uuid') uuid: string) {
    try {
      return await this.booksService.deleteByUUID(uuid);
    } catch (error) {
      throw new HttpException('Failed to delete book', HttpStatus.BAD_REQUEST);
    }
  }
}
