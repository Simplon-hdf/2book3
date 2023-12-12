import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from '../utils/normalized.response';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createAuthorDto: CreateAuthorDto) {
    
    const createdAuthor = await this.prisma.authors.create({
      data: {
        firstname: createAuthorDto.firstName,
        lastname: createAuthorDto.lastName,
      },
    });
    const createdMessage = "Author has been created";

    return new NormalizedResponse(createdMessage,createdAuthor).toJSON()
  }

  public async getByUUID(uuid: string) {
    
    const gettedAuthor = await this.prisma.authors.getByUUID({
      where: {
        UUID: uuid,
      },
    });
    const gettedMessage = `Author has been found`; 

    return new NormalizedResponse(gettedMessage,gettedAuthor).toJSON();
  }

  public async updateByUUID(uuid: string, updateAuthorDto: UpdateAuthorDto) {
    
    const updatedAuthor = await this.prisma.authors.updateByUUID({
      where: {
        UUID: uuid,
      },
      data : {
        firstname: updateAuthorDto.firstName,
        lastname: updateAuthorDto.lastName,
      }
    });
    const updatedMessage = `The author has been updated`;
    
    return new NormalizedResponse(updatedMessage,updatedAuthor);
  }

  public async deleteByUUID(uuid: string) {
    
    const deletedAuthor = await this.prisma.authors.deleteByUUID({
      where: {
        UUID: uuid,
      },
    });
    const deletedMessage = `The author has been deleted`;
    
    return new NormalizedResponse(deletedMessage,deletedAuthor);
  }
}

