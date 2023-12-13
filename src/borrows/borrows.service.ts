import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import NormalizedResponse from '../utils/normalized.response';
import { addDays, format } from 'date-fns';

@Injectable()
export class BorrowsService {
    constructor (private readonly prisma: PrismaService){}

  public async create(createBorrowDto: CreateBorrowDto) {
    const endAt = addDays(new Date(createBorrowDto.started_at), 7);
    const formattedEndAt = format(endAt, 'dd-MM-yyyy');

    const createdBorrow = new NormalizedResponse(
      `Borrow has been created`,
      await this.prisma.borrows.create({
        data: {
          started_at: createBorrowDto.started_at,
          end_at: formattedEndAt,
          status: createBorrowDto.status,
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
      }),
    );
    return createdBorrow.toJSON
  }

  public async getByUUID(uuid: string) {
    return await this.prisma.borrows.findUnique({
      where: {
        UUID: uuid,
      },
    });
  }

  public async updateByUUID(uuid: string, updateBorrowDto: UpdateBorrowDto) {
    const updatedBorrow = new NormalizedResponse(
      `Borrow has been updated`,
        await this.prisma.borrows.update({
      where: {
        UUID: uuid,
      },
      data: {
        started_at: updateBorrowDto.started_at,
        end_at: updateBorrowDto.end_at,
        status: updateBorrowDto.status,
      },
    }),
    );
    return updatedBorrow.toJSON
  }

  public async deleteByUUID(uuid: string) {
    const deletedBorrow = new NormalizedResponse(
      `Borrow has been deleted`,
     await this.prisma.borrows.delete({
      where: {
        UUID: uuid,
      },
    }),
    );
    return deletedBorrow.toJSON
  }
}
