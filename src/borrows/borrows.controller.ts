import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Post()
  create(
    @Param('UUID') UUID: string, 
    @Body() createBorrowDto: CreateBorrowDto)
   {
    return this.borrowsService.create(UUID, createBorrowDto);
  }

  @Get()
  public getByUUID(
  @Param('UUID') uuid: string ) {
    return this.borrowsService.getByUUID(uuid);
  }


  @Patch()
  updateByUUID(
    @Param('UUID') UUID: string, 
    @Body() updateBorrowDto: UpdateBorrowDto) {
    return this.borrowsService.updateByUUID(UUID, updateBorrowDto);
  }

  @Delete()
  deleteByUUID(
    @Param('UUID') UUID: string) {
    return this.borrowsService.deleteByUUID(UUID);
  }
}
