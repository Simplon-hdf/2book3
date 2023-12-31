import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService, PrismaService],
})
export class BorrowsModule {}
