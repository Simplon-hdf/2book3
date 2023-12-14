import { Injectable } from '@nestjs/common';
import { CreateHumanInformationDto } from './dto/create-human-information.dto';
import { UpdateHumanInformationDto } from './dto/update-human-information.dto';
import { PrismaService } from '../prisma.service';
import NormalizedResponse from "../utils/normalized.response";

@Injectable()
export class HumanInformationsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createHumanInformationDto: CreateHumanInformationDto) {
    try {
      const humanInformation = await this.prisma.humanInformations.create({
        data: {
          first_name: createHumanInformationDto.first_name,
          last_name: createHumanInformationDto.last_name,
        },
      });

      return new NormalizedResponse('Human created successfully', humanInformation).toJSON();
    } catch (error) {
      // Handle or log the error as needed
      return new NormalizedResponse('Error creating human information', null).toJSON();
    }
  }

  public async getByUUID(uuid: string) {
    try {
      const human = await this.prisma.humanInformations.findUnique({
        where: { UUID: uuid },
      });

      if (!human) {
        return new NormalizedResponse(`Human not found with UUID: ${uuid}`, null).toJSON();
      }

      return new NormalizedResponse(`Human found with UUID: ${uuid}`, human).toJSON();
    } catch (error) {
      return new NormalizedResponse(`Error finding human with UUID: ${uuid}`, null).toJSON();
    }
  }

  public async updateByUUID(uuid: string, updateHumanInformationDto: UpdateHumanInformationDto) {
    try {
      const updatedHuman = await this.prisma.humanInformations.update({
        where: { UUID: uuid },
        data: {
          first_name: updateHumanInformationDto.first_name,
          last_name: updateHumanInformationDto.last_name,
        },
      });

      return new NormalizedResponse(`Human updated with UUID: ${uuid}`, updatedHuman).toJSON();
    } catch (error) {
      return new NormalizedResponse(`Error updating human with UUID: ${uuid}`, null).toJSON();
    }
  }

  public async deleteByUUID(uuid: string) {
    try {
      const deletedHumanInformation = await this.prisma.humanInformations.delete({
        where: { UUID: uuid },
      });

      return new NormalizedResponse(`Human deleted with UUID: ${uuid}`, deletedHumanInformation).toJSON();
    } catch (error) {
      return new NormalizedResponse(`Error deleting human with UUID: ${uuid}`, null).toJSON();
    }
  }
}
