import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateHumanInformationDto } from '../human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an employee', description: 'Add a new employee along with their human information to the database' })
  public async create(@Body() createEmployeeDto: CreateEmployeeDto, @Body() CreateHumanInformationDto: CreateHumanInformationDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get employee by UUID', description: 'Retrieve an employee using their UUID' })
  public async getByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.getByUUID(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update employee information', description: 'Update an employee\'s information using their UUID' })
  updateByUUID(@Param('uuid') uuid: string, @Body() updateHumanInformationDto: UpdateHumanInformationDto) {
    return this.employeesService.updateByUUID(uuid, updateHumanInformationDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete an employee', description: 'Remove an employee from the database using their UUID' })
  public async deleteByUUID(@Param('uuid') uuid: string) {
    return this.employeesService.deleteByUUID(uuid);
  }
}
