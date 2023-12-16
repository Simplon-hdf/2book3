import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';

@ApiTags('Borrowers')
@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a borrower', description: 'Add a new borrower to the database' })
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersService.create(createBorrowerDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get borrower by UUID', description: 'Retrieve a borrower using their UUID' })
  getByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.getByUUID(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update borrower information', description: 'Update a borrower\'s information using their UUID' })
  updateByUUID(@Param('uuid') uuid: string, @Body() updateHumanInformationDto: UpdateHumanInformationDto) {
    return this.borrowersService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a borrower', description: 'Remove a borrower from the database using their UUID' })
  deleteByUUID(@Param('uuid') uuid: string) {
    return this.borrowersService.deleteByUUID(uuid);
  }
}
