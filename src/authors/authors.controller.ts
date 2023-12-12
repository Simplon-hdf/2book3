import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto , createHumanInformationDto: CreateHumanInformationDto) {
    return this.authorsService.create(createAuthorDto , createHumanInformationDto);
  }

  @Get(':uuid')
  getByUUID(@Param('uuid') uuid: string) {
    return this.authorsService.getByUUID(uuid);
  }

  @Patch(':uuid')
  updateByUUID(@Param('uuid') uuid: string, @Body() updateHumanInformationDto: UpdateHumanInformationDto) {
    return this.authorsService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  deleteByUUID(@Param('uuid') uuid: string) {
    return this.authorsService.deleteByUUID(uuid);
  }
}
