import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Post()
  public async create(@Body() createEmployeeDto: CreateEmployeeDto, @Body() CreateHumanInformationDto: CreateHumanInformationDto) {
    return this.employeesService.create(createEmployeeDto, CreateHumanInformationDto);
  }

  @Get(':uuid')
  public async getByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.getByUUID(uuid);
  }

  @Patch(':uuid')
  public async updateByUUID(@Param('uuid') uuid: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Body() UpdateHumanInformationDto: UpdateHumanInformationDto) {
    return this.employeesService.updateByUUID(uuid, updateEmployeeDto, UpdateHumanInformationDto);
  }

  @Delete(':uuid')
  public async deleteByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.deleteByUUID(uuid);
  }
}
