import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@ApiTags('Borrows')
@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a borrow record', description: 'Add a new borrow record to the database' })
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowsService.create(createBorrowDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get borrow record by UUID', description: 'Retrieve a borrow record using its UUID' })
  public getByUUID(@Param('uuid') uuid: string) {
    return this.borrowsService.getByUUID(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update borrow record', description: 'Update a borrow record using its UUID' })
  updateByUUID(@Param('uuid') uuid: string) {
    return this.borrowsService.updateByUUID(uuid);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a borrow record', description: 'Remove a borrow record from the database using its UUID' })
  deleteByUUID(@Param('uuid') uuid: string) {
    return this.borrowsService.deleteByUUID(uuid);
  }
}

