import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumanInformationsService } from './human-informations.service';
import { CreateHumanInformationDto } from './dto/create-human-information.dto';
import { UpdateHumanInformationDto } from './dto/update-human-information.dto';

@Controller('human-informations')
export class HumanInformationsController {
  constructor(private readonly humanInformationsService: HumanInformationsService) {}
  
  @Post()
  async create(
    @Param('UUID') uuid: string, 
    @Body() createHumanInformationDto: CreateHumanInformationDto
  ) {
    return this.humanInformationsService.create(uuid, createHumanInformationDto);
  }


  @Get(':uuid')
  public getByUUID(@Param('uuid') uuid: string) {
    return this.humanInformationsService.getByUUID(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateHumanInformationDto: UpdateHumanInformationDto
  ) {
    return this.humanInformationsService.updateByUUID(uuid, updateHumanInformationDto);
  }


  @Delete(':uuid')
  public deleteByUUID(@Param('uuid') uuid: string) {
    return this.humanInformationsService.deleteByUUID(uuid);
  }
}