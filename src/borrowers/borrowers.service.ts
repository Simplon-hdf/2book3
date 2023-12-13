import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from '../prisma.service';
import NormalizedResponse from '../utils/normalized.response';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';



@Injectable()
export class BorrowersService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(uuid: string, createHumanInformationDto: CreateHumanInformationDto) {
    const createdBorrower = new NormalizedResponse(
      `Borrower ${createHumanInformationDto.first_name} ${createHumanInformationDto.last_name} has been created`,
      await this.prisma.borrowers.create({
        data: {
          UUID: uuid,
          humanInformation: {
            create: {
              first_name: createHumanInformationDto.first_name,
              last_name: createHumanInformationDto.last_name,
            },
          },
        }
      }),
    );
    return createdBorrower.toJSON();
  };


  public async getByUUID(uuid: string) {
    const getBorrower = new NormalizedResponse(
      `Borrower ${uuid} has been get`,
      await this.prisma.borrowers.findUnique({
        where: {
          UUID: uuid,
        },
      }),
    );
    return getBorrower.toJSON();
  };


  public async updateByUUID(uuid: string, updateHumanInformationDto : UpdateHumanInformationDto) {
    const updateBorrower = new NormalizedResponse(
      `Borrower has been update`,
      await this.prisma.borrowers.update({
        where: {
          UUID: uuid,
        },
        data: {
          humanInformation: {
            update: {
              first_name: updateHumanInformationDto.first_name,
              last_name: updateHumanInformationDto.last_name,
            },
          },
        }
      }),
    );
    return updateBorrower.toJSON();
  };

  public async deleteByUUID(uuid: string) {
    const deleteBorrower = new NormalizedResponse(
      `Borrower ${uuid} has been delete`,
      await this.prisma.borrowers.delete({
        where: {
          UUID: uuid,
        },
      }),
    );
    return deleteBorrower.toJSON();
  };
}