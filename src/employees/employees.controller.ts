import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateHumanInformationDto } from '../human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  public async create(@Body() createEmployeeDto: CreateEmployeeDto, @Body() CreateHumanInformationDto: CreateHumanInformationDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get(':uuid')
  public async getByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.getByUUID(uuid);
  }

  @Patch(':uuid')
  updateByUUID(@Param('uuid') uuid: string,
       @Body() updateHumanInformationDto: UpdateHumanInformationDto,
  ) {
    return this.employeesService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  public async deleteByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.deleteByUUID(uuid);
  }
}
