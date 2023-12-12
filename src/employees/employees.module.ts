import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeeService],
})
export class EmployeesModule {}
