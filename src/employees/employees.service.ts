import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createEmployeeDto: CreateEmployeeDto, CreateHumanInformationDto: CreateHumanInformationDto) {
    const humanInformation = await this.prisma.humanInformations.create({
      data: {
        first_name: CreateHumanInformationDto.first_name,
        last_name: CreateHumanInformationDto.last_name,
      },
    });

    return await this.prisma.employees.create({
      data: {
        mail_address: createEmployeeDto.mail,
        password: createEmployeeDto.password,
        humanInformation_uuid: humanInformation.UUID,
      },
    });
  }
  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
