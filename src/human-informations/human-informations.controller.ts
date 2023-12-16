import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HumanInformationsService } from './human-informations.service';
import { CreateHumanInformationDto } from './dto/create-human-information.dto';
import { UpdateHumanInformationDto } from './dto/update-human-information.dto';

@ApiTags('Human Informations')
@Controller('human-informations')
export class HumanInformationsController {
  constructor(private readonly humanInformationsService: HumanInformationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create human information', description: 'Add new human information to the database' })
  async create(@Body() createHumanInformationDto: CreateHumanInformationDto) {
    return this.humanInformationsService.create(createHumanInformationDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get human information by UUID', description: 'Retrieve human information using their UUID' })
  public getByUUID(@Param('uuid') uuid: string) {
    return this.humanInformationsService.getByUUID(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update human information', description: 'Update human information by their UUID' })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateHumanInformationDto: UpdateHumanInformationDto
  ) {
    return this.humanInformationsService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete human information', description: 'Remove human information from the database using their UUID' })
  public deleteByUUID(@Param('uuid') uuid: string) {
    return this.humanInformationsService.deleteByUUID(uuid);
  }
}
