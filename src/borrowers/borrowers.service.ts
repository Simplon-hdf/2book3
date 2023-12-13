import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from '../prisma.service';
import NormalizedResponse from '../utils/normalized.response';

@Injectable()
export class BorrowersService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(createBorrowerDto: CreateBorrowerDto) {

    const createdBorrower = await this.prisma.borrowers.create({
      data: {
        humanInformation: {
          create: {
            first_name: createBorrowerDto.first_name,
            last_name: createBorrowerDto.last_name,
          },
        },
      },
    });
    const createdMessage = `Borrower : ${createBorrowerDto.first_name} ${createBorrowerDto.last_name} has been created`;

    return new NormalizedResponse(createdMessage, createdBorrower).toJSON()
  }

  public async getByUUID(uuid: string) {

    const gettedBorrower = await this.prisma.borrowers.findUnique({
      where: {
        UUID: uuid,
      },
      include: {
        humanInformation: true,
      }
    }
    );
    const gettedMessage = `Borrower ${uuid} has been found`;

    return new NormalizedResponse(gettedMessage, gettedBorrower).toJSON();
  }



  public async updateByUUID(uuid: string, updateBorrowerDto: UpdateBorrowerDto) {

    const updatedBorrower = await this.prisma.borrowers.update({
      where: {
        UUID: uuid,
      },
      data: {
        humanInformation: {
          update: {
            first_name: updateBorrowerDto.first_name,
            last_name: updateBorrowerDto.last_name,
          },
        },
      },
      include : {
        humanInformation : true,
        
      }
    });
    const updatedMessage = `The borrower ${updatedBorrower.humanInformation.first_name} ${updatedBorrower.humanInformation.last_name} has been updated`;

    return new NormalizedResponse(updatedMessage, updatedBorrower);
  }

  public async deleteByUUID(uuid: string) {
    const deletedBorrower = await this.prisma.borrowers.delete({
      where: {
        UUID: uuid,
      },
    });
    const deletedMessage = `The borrower ${uuid} has been deleted`;

    return new NormalizedResponse(deletedMessage, deletedBorrower);
  }
}