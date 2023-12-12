import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeesModule {}
