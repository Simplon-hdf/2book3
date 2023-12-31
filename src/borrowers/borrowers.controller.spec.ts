import { Test, TestingModule } from '@nestjs/testing';
import { BorrowersController } from './borrowers.controller';
import { BorrowersService } from './borrowers.service';
import { PrismaService } from '../prisma.service';

describe('BorrowersController', () => {
  let controller: BorrowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowersController],
      providers: [PrismaService , BorrowersService],
    }).compile();

    controller = module.get<BorrowersController>(BorrowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
