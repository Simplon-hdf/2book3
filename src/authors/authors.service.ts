import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { CreateHumanInformationDto } from '../human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from 'src/human-informations/dto/update-human-information.dto';
import { PrismaService } from '../prisma.service';
import NormalizedResponse from '../utils/normalized.response';
import { HumanInformation } from 'src/human-informations/entities/human-information.entity';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(createAuthorDto: CreateAuthorDto) {

    const createdAuthor = await this.prisma.authors.create({
      data: {
        humanInformation: {
          create: {
            first_name: createAuthorDto.first_name,
            last_name: createAuthorDto.last_name,
          },
        },
      },
    });
    const createdMessage = `Author : ${createAuthorDto.first_name} ${createAuthorDto.last_name} has been created`;

    return new NormalizedResponse(createdMessage, createdAuthor).toJSON()
  }

  public async getByUUID(uuid: string) {

    const gettedAuthor = await this.prisma.authors.findUnique({
      where: {
        UUID: uuid,
      },
      include: {
        humanInformation: true,
      }
    }
    );
    const gettedMessage = `Author ${uuid} has been found`;

    return new NormalizedResponse(gettedMessage, gettedAuthor).toJSON();
  }



  public async updateByUUID(uuid: string, updateAuthorDto: UpdateAuthorDto) {

    const updatedAuthor = await this.prisma.authors.update({
      where: {
        UUID: uuid,
      },
      data: {
        humanInformation: {
          update: {
            first_name: updateAuthorDto.first_name,
            last_name: updateAuthorDto.last_name,
          },
        },
      },
      include : {
        humanInformation : true,
        
      }
    });
    const updatedMessage = `The author ${updatedAuthor.humanInformation.first_name} ${updatedAuthor.humanInformation.last_name} has been updated`;

    return new NormalizedResponse(updatedMessage, updatedAuthor);
  }

  public async deleteByUUID(uuid: string) {
    const deletedAuthor = await this.prisma.authors.delete({
      where: {
        UUID: uuid,
      },
    });
    const deletedMessage = `The author ${uuid} has been deleted`;

    return new NormalizedResponse(deletedMessage, deletedAuthor);
  }
}