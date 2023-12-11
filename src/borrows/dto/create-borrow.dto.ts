import { ENTRY_PROVIDER_WATERMARK } from '@nestjs/common/constants';
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsUUID, Length } from 'class-validator';

export class CreateBorrowsDto {

    @ApiProperty({
        description: 'This field represents the borrowing start',
        minLength: 1,
        maxLength: 20,
      })
  @IsDate()
  @Length(1, 20)
 public  started_at: string;

 @ApiProperty({
    description: 'This field represents the borring end time',
    minLength: 1,
    maxLength: 20,
  })
  @IsDate()
  @Length(1, 20)
  public end_at: string;

  @ApiProperty({
    description: 'This field represents the borrowing status',
    minLength: 1,
    maxLength: 1,
  })
  @IsInt()
  public status: number;
}