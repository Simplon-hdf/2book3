import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from 'src/prisma.service';
import NormalizedResponse from 'src/utils/normalized.response';
import { CreateHumanInformationDto } from 'src/human-informations/dto/create-human-information.dto';
import { UpdateHumanInformationDto } from '../human-informations/dto/update-human-information.dto';



@Injectable()
export class BorrowersService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(createBorrowerDto: CreateBorrowerDto, createHumanInformationDto: CreateHumanInformationDto) {
    const createdBorrower = new NormalizedResponse(
      `Borrower ${createHumanInformationDto.first_name} ${createHumanInformationDto.last_name} has been created`,
      await this.prisma.borrowers.create({
        data: {
          UUID: createBorrowerDto.UUID,
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


  public async updateByUUID(UpdateBorrowerDto: UpdateBorrowerDto, UpdateHumanInformationDto : UpdateHumanInformationDto) {
    const updateBorrower = new NormalizedResponse(
      `Borrower has been update`,
      await this.prisma.borrowers.update({
        where: {
          UUID: UpdateBorrowerDto.UUID,
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