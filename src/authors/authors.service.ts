import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized.response';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';



@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(createAuthorDto: CreateAuthorDto, createHumanInformationDto: CreateHumanInformationDto) {
    const createdAuthor = new NormalizedResponse(
      `Author ${createHumanInformationDto.first_name} ${createHumanInformationDto.last_name} has been created`,
      await this.prisma.authors.create({
        data: {
          UUID: createAuthorDto.UUID,
          humanInformation: {
            create: {
              first_name: createHumanInformationDto.first_name,
              last_name: createHumanInformationDto.last_name,
            },
          },
        }
      }),
    );
    return createdAuthor.toJSON();
  };


  public async getByUUID(uuid: string) {
    const getAuthor = new NormalizedResponse(
      `Author ${uuid} has been get`,
      await this.prisma.authors.findUnique({
        where: {
          UUID: uuid,
        },
      }),
    );
    return getAuthor.toJSON();
  };


  public async updateByUUID(updateAuthorDto: UpdateAuthorDto, UpdateHumanInformationDto : UpdateHumanInformationDto) {
    const updateAuthor = new NormalizedResponse(
      `Author has been update`,
      await this.prisma.authors.update({
        where: {
          UUID: updateAuthorDto.UUID,
        },
        data: {
          humanInformation: {
            create: {
              first_name: UpdateHumanInformationDto.first_name,
              last_name: UpdateHumanInformationDto.last_name,
            },
          },
        }
      }),
    );
    return updateAuthor.toJSON();
  };

  public async deleteByUUID(uuid: string) {
    const deleteAuthor = new NormalizedResponse(
      `Author ${uuid} has been delete`,
      await this.prisma.authors.delete({
        where: {
          UUID: uuid,
        },
      }),
    );
    return deleteAuthor.toJSON();
  };
}