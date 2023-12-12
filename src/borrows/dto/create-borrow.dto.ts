import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, Length } from 'class-validator';

export class CreateBorrowDto {

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