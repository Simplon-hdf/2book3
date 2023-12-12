import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized.response';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';



@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
}

