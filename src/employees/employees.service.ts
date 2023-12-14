import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';
import  NormalizedResponse from "../utils/normalized.response";
import * as bcrypt from 'bcrypt';



  @Injectable()
export class EmployeesService {
  private saltGenRound = 12;
  constructor(private readonly prisma: PrismaService) { }

  public async create(createEmployeeDto: CreateEmployeeDto) {

    const createdEmployee = await this.prisma.employees.create({
      data: {
        mail_address: createEmployeeDto.mail,
        password: await bcrypt.hash(createEmployeeDto.password, this.saltGenRound),
        humanInformation: {
          create: {
            first_name: createEmployeeDto.first_name,
            last_name: createEmployeeDto.last_name,
          },
        },
      },
    });
    const createdMessage = `Employee : ${createEmployeeDto.first_name} ${createEmployeeDto.last_name} has been created`;

    return new NormalizedResponse(createdMessage, createdEmployee).toJSON()
  }



  public async getByUUID(uuid: string) {
    const gettedEmployee = await this.prisma.employees.findUnique({
      where: {
        UUID: uuid,
      },
      include: {
        humanInformation: true,
      }
    }
    );
    const gettedMessage = `Employee ${uuid} has been found`;

    return new NormalizedResponse(gettedMessage, gettedEmployee).toJSON();
  }

  public async updateByUUID(uuid: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.prisma.employees.update({
      where: {
        UUID: uuid,
      },
      data: {
        // mail_address: updateEmployeeDto.mail,
        // password: await bcrypt.hash(updateEmployeeDto.password, this.saltGenRound),
        humanInformation: {
          update: {
            first_name: updateEmployeeDto.first_name,
            last_name: updateEmployeeDto.last_name,
          },
        },
      },
      include : {
        humanInformation : true,
       }
    });
    const updatedMessage = `Employee ${updatedEmployee.humanInformation.first_name} ${updatedEmployee.humanInformation.last_name} has been updated`;

    return new NormalizedResponse(updatedMessage, updatedEmployee);
  }


    public async deleteByUUID(uuid: string) {
      const deletedEmployee = await this.prisma.employees.delete({
        where: {
          UUID: uuid,
        },
      });
      const deletedMessage = `Employee ${uuid} has been deleted`;

      return new NormalizedResponse(deletedMessage, deletedEmployee);
    }
    
}