import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';

@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  create(@Body() createBorrowerDto: CreateBorrowerDto
  ) {
    return this.borrowersService.create(createBorrowerDto);
  }

  @Get(':uuid')
  getByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.getByUUID(uuid);
  }

  @Patch(':uuid')
  updateByUUID(@Param('uuid') uuid: string,
       @Body() updateHumanInformationDto: UpdateHumanInformationDto
  ) {
    return this.borrowersService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  deleteByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.deleteByUUID(uuid);
  }
}