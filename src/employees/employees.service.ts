import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';
import  NormalizedResponse from "../utils/normalized.response";
import * as bcrypt from 'bcrypt';

@Injectable()
  export class EmployeeService {
    private saltGenRound = 12;
    constructor(private readonly prisma: PrismaService) {}
  
    public async create(createEmployeeDto: CreateEmployeeDto, createHumanInformationDto: CreateHumanInformationDto) {
      const createdEmployee = await this.prisma.employees.create({
          data: {
              mail_address: createEmployeeDto.mail,
              password: await bcrypt.hash(createEmployeeDto.password, this.saltGenRound),
              humanInformation: {
                  create: {
                      first_name: createHumanInformationDto.first_name,
                      last_name: createHumanInformationDto.last_name,
                  },
              },
          },
      });
  
      const createdMessage = `Employee: ${createHumanInformationDto.first_name} ${createHumanInformationDto.last_name} has been created`;
      return new NormalizedResponse(createdMessage, createdEmployee).toJSON();
  }
  
    public async getByUUID(uuid: string) {
      const employee = await this.prisma.employees.findUnique({
        where: {
          UUID: uuid,
        },
      });
    
      if (!employee) {
        return new NormalizedResponse(`Employee not found with UUID: ${uuid}`, null).toJSON();
      }
    
      return new NormalizedResponse(`Employee found with UUID: ${uuid}`, employee).toJSON();
    }
    
    public async updateByUUID(uuid: string, updateEmployeeDto: UpdateEmployeeDto, updateHumanInformationDto: UpdateHumanInformationDto) {
      await this.prisma.humanInformations.update({
          where: { UUID: uuid },
          data: {
              first_name: updateHumanInformationDto.first_name,
              last_name: updateHumanInformationDto.last_name,
          },
      });
  
      const updatedEmployee = await this.prisma.employees.update({
          where: { UUID: uuid },
          data: {
              mail_address: updateEmployeeDto.mail,
              password: await bcrypt.hash(updateEmployeeDto.password, this.saltGenRound),
          },
      });
  
      const updatedMessage = `Employee updated with UUID: ${uuid}`;
      return new NormalizedResponse(updatedMessage, updatedEmployee).toJSON();
  }
  
    public async deleteByUUID(uuid: string) {
      const deletedEmployee = await this.prisma.employees.delete({
        where: {
          UUID: uuid,
        },
      });
    
      return new NormalizedResponse(`Employee deleted with UUID: ${uuid}`, deletedEmployee).toJSON();
    }
    
}