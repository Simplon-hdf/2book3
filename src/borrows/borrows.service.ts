import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Injectable()
export class BorrowsService {
    constructor (private readonly prisma: PrismaService){}

  public async create(createBorrowDto: CreateBorrowDto) {
    return await this.prisma.borrows.create({
      data: {
        started_at: createBorrowDto.started_at,
        end_at: createBorrowDto.end_at,
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
    });
  }

  public async getByUUID(uuid: string) {
    return await this.prisma.borrows.findUnique({
      where: {
        UUID: uuid,
      },
    });
  }

  public async updateByUUID(uuid: string, updateBorrowDto: UpdateBorrowDto) {
    return await this.prisma.borrows.update({
      where: {
        UUID: uuid,
      },
      data: {
        started_at: updateBorrowDto.started_at,
        end_at: updateBorrowDto.end_at,
        status: updateBorrowDto.status,
      }
    });
  }

  public async deleteByUUID(uuid: string) {
    return await this.prisma.borrows.delete({
      where: {
        UUID: uuid,
      },
    });
  }
}
