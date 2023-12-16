import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';


@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author', description: 'Add a new author to the database' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get author by UUID', description: 'Retrieve an author using their UUID' })
  getByUUID(@Param('uuid') uuid: string) {
    return this.authorsService.getByUUID(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update author information', description: 'Update an author\'s information by their UUID' })
  updateByUUID(@Param('uuid') uuid: string, @Body() updateHumanInformationDto: UpdateHumanInformationDto) {
    return this.authorsService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete an author', description: 'Remove an author from the database using their UUID' })
  deleteByUUID(@Param('uuid') uuid: string) {
    return this.authorsService.deleteByUUID(uuid);
  }
}
