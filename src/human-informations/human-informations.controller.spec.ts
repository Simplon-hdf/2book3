import { Test, TestingModule } from '@nestjs/testing';
import { HumanInformationsController } from './human-informations.controller';
import { HumanInformationsService } from './human-informations.service';
import { PrismaService } from '../prisma.service';

describe('HumanInformationsController', () => {
  let controller: HumanInformationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HumanInformationsController],
      providers: [PrismaService , HumanInformationsService],
    }).compile();

    controller = module.get<HumanInformationsController>(HumanInformationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
