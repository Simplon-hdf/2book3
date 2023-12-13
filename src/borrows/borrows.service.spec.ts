import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsService } from './borrows.service';
import { PrismaService } from '../prisma.service';

describe('BorrowsService', () => {
  let service: BorrowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService , BorrowsService],
    }).compile();

    service = module.get<BorrowsService>(BorrowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
