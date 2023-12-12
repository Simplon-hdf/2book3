import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { CreateHumanInformationDto } from '../human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from '../utils/normalized.response';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createAuthorDto: CreateAuthorDto, createHumanInformationDto: CreateHumanInformationDto) {
    
    const createdAuthor = await this.prisma.authors.create({
      data: {
        humanInformation: {
          create: {
            first_name: createHumanInformationDto.first_name,
            last_name: createHumanInformationDto.last_name,
          },
        },
      },
    });
    const createdMessage = `Author : ${createHumanInformationDto.first_name} ${createHumanInformationDto.last_name} has been created`;

    return new NormalizedResponse(createdMessage,createdAuthor).toJSON()
  }

  public async getByUUID(uuid: string) {
    
    const gettedAuthor = await this.prisma.authors.findUnique({
      where: {
        UUID: uuid,
      },
    });
    const gettedMessage = `Author ${uuid} has been found`; 

    return new NormalizedResponse(gettedMessage,gettedAuthor).toJSON();
  }

  public async updateByUUID(uuid: string, updateHumanInformationDto: UpdateHumanInformationDto) {
    
    const updatedAuthor = await this.prisma.authors.update({
      where: {
        UUID: uuid,
      },
      data : {
        humanInformation: {
          data: {
            first_name: updateHumanInformationDto.first_name,
            last_name: updateHumanInformationDto.last_name,
          },
        },
      },
    });
    const updatedMessage = `The author ${uuid} has been updated`;
    
    return new NormalizedResponse(updatedMessage,updatedAuthor);
  }

  public async deleteByUUID(uuid: string) {
    
    const deletedAuthor = await this.prisma.authors.delete({
      where: {
        UUID: uuid,
      },
    });
    const deletedMessage = `The author ${uuid} has been deleted`;
    
    return new NormalizedResponse(deletedMessage,deletedAuthor);
  }
}

