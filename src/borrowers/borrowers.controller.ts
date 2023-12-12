import { Controller, Get, Post, Body, , Param, Delete, Patch } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';

@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  public create(@Body() createBorrowerDto: CreateBorrowerDto, createHumanInformationDto: CreateHumanInformationDto) {
    return this.borrowersService.create(createBorrowerDto, createHumanInformationDto);
  }

  @Get()
  public getByUUID(
    @Param('uuid') UUID: string ){
    return this.borrowersService.getByUUID(UUID);
  }


  @Patch()
  public updateByUUID(
      @Body() updateBorrowerDto: UpdateBorrowerDto, updateHumanInformationDto : UpdateHumanInformationDto) {
    return this.borrowersService.updateByUUID(updateBorrowerDto, updateHumanInformationDto);
  }



  @Delete(':uuid')
  remove(@Param('uuid') UUID: string) {
    return this.borrowersService.deleteByUUID(UUID);
  }
}