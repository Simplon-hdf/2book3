import { Injectable } from '@nestjs/common';
import { CreateHumanInformationDto } from './dto/create-human-information.dto';
import { UpdateHumanInformationDto } from './dto/update-human-information.dto';
import { PrismaService } from '../prisma.service';
import  NormalizedResponse from "../utils/normalized.response";
import { HumanInformation } from './entities/human-information.entity';

@Injectable()
export class HumanInformationsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(uuid: string, createHumanInformationDto: CreateHumanInformationDto) {
    try {
      const humanInformation = await this.prisma.humanInformations.create({
        data: {
          first_name: createHumanInformationDto.first_name,
          last_name: createHumanInformationDto.last_name,
          UUID: uuid,
        },
      });

      return new NormalizedResponse('Human created successfully', humanInformation).toJSON();
    } catch (error) {
      
      return new NormalizedResponse('Error creating human information', null).toJSON();
    }
  }


public async getByUUID(uuid: string) {
  const human = await this.prisma.humanInformations.findUnique({
    where: {
      UUID: uuid,
    },
  });

  if (!human) {
    return new NormalizedResponse(`Human not found with UUID: ${uuid}`, null).toJSON();
  }

  return new NormalizedResponse(`Human found with UUID: ${uuid}`, HumanInformation).toJSON();
}

public async updateByUUID(uuid: string,updateHumanInformationDto: UpdateHumanInformationDto) {
  await this.prisma.humanInformations.update({
    where: { UUID: uuid },
    data: {
      first_name: updateHumanInformationDto.first_name,
      last_name: updateHumanInformationDto.last_name,
      UUID: uuid,
    },
  });

  return new NormalizedResponse(`Human updated with UUID: ${uuid}`, UpdateHumanInformationDto).toJSON();
}

public async deleteByUUID(uuid: string) {
  const deletedHumanInformation = await this.prisma.humanInformations.delete({
    where: {
      UUID: uuid,
    },
  });

  return new NormalizedResponse(`Human deleted with UUID: ${uuid}`, deletedHumanInformation).toJSON();
}
}