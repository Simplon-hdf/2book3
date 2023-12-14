import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import NormalizedResponse from '../utils/normalized.response';
import { addDays } from 'date-fns';

@Injectable()
export class BorrowsService {
  constructor(private readonly prisma: PrismaService) { }

  public async create(createBorrowDto: CreateBorrowDto) {
    const started_at = new Date()
    const endAt = addDays(new Date(started_at), 7);

    const createdBorrow = await this.prisma.borrows.create({
      data: {
        started_at: started_at,
        end_at: endAt,
        status: "ONGOING",
        employee: {
          connect: {
            UUID: createBorrowDto.employee_uuid,
          },
        },
        borrower: {
          connect: {
            UUID: createBorrowDto.borrower_uuid,
          },
        },
      },
    })
    const createMessage = `The borrow has been created`;

    return new NormalizedResponse(createMessage, createdBorrow);
  }

  public async getByUUID(uuid: string) {

    const gettedBorrow = await this.prisma.borrows.findUnique({

      where: {
        UUID: uuid,
      },
    });
    const gettedMessage = `Borrow ${uuid} has been found`;

    return new NormalizedResponse(gettedMessage, gettedBorrow).toJSON();
  }

  public async updateByUUID(uuid: string) {
    const started_at = new Date()
    const endAt = addDays(new Date(started_at), 7);
    const updatedBorrow = await this.prisma.borrows.update({
      where: {
        UUID: uuid,
      },

      data: {
        started_at: started_at,
        end_at: endAt,
         status: "ONGOING",
      },
    });

    const updatedMessage = `The borrow ${uuid} has been updated`;

    return new NormalizedResponse(updatedMessage, updatedBorrow);
  }

  public async deleteByUUID(uuid: string) {
    const deletedBorrow = await this.prisma.borrows.delete({
      where: {
        UUID: uuid,
      },
    });
    const deletedMessage = `The borrow ${uuid} has been deleted`;

    return new NormalizedResponse(deletedMessage, deletedBorrow);
  }
}
