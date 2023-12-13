import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employees.service';
import { PrismaService } from '../prisma.service';

describe('EmployeesService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService , EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
