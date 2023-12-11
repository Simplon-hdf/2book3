import { PartialType } from '@nestjs/swagger';
import { CreateBorrowsDto } from './create-borrow.dto';

export class UpdateBorrowDto extends PartialType(CreateBorrowsDto) {}
