import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createAuthorDto: CreateAuthorDto) {
    return await this.prisma.authors.create({
      data: {
        firstname: createAuthorDto.firstName,
        lastname: createAuthorDto.lastName,
      },
    });
  }

  public async getByUUID(uuid: string) {
    return await this.prisma.authors.getByUUID({
      where: {
        UUID: uuid,
      },
    });
  }

  public async updateByUUID(uuid: string, updateAuthorDto: UpdateAuthorDto) {
    return await this.prisma.authors.updateByUUID({
      where: {
        UUID: uuid,
      },
      data : {
        firstname: updateAuthorDto.firstName,
        lastname: updateAuthorDto.lastName,
      }
    });
  }

  public async deleteByUUID(uuid: string) {
    return await this.prisma.authors.deleteByUUID({
      where: {
        UUID: uuid,
      },
    });
  }
}

