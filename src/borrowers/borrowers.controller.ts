import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { CreateHumanInformationDto } from '../human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';

@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  async create(
    @Param('uuid') uuid: string,
    @Body() createHumanInformationDto: CreateHumanInformationDto
  ) {
    return this.borrowersService.create(uuid ,  createHumanInformationDto);
  }

  @Get(':uuid')
  public getByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.getByUUID(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
       @Body() updateHumanInformationDto: UpdateHumanInformationDto
  ) {
    return this.borrowersService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  public deleteByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.deleteByUUID(uuid);
  }
}