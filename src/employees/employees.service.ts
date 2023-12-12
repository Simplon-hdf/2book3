import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';


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

  public async getByUUID(uuid: string) {
    return await this.prisma.employees.findUnique({
      where: {
        UUID: uuid,
      },
    });
  }

  public async update(uuid: string, updateEmployeeDto: UpdateEmployeeDto, updateHumanInformationDto: UpdateHumanInformationDto) {
    await this.prisma.humanInformations.update({
        where: { UUID: uuid },
        data: {
            first_name: updateHumanInformationDto.first_name,
            last_name: updateHumanInformationDto.last_name,
        },
    });

    return await this.prisma.employees.update({
        where: { UUID: uuid },
        data: {
            mail_address: updateEmployeeDto.mail,
            password: updateEmployeeDto.password,
        },
    });
}

public async deleteByUUID(uuid: string) {
  return await this.prisma.employees.delete({
    where: {
      UUID: uuid,
    },
  });
}
}