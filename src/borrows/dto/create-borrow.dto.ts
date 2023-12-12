import { ApiProperty } from "@nestjs/swagger";
import { borrowState } from "@prisma/client";
import { IsDate, IsInt, Length, IsUUID } from 'class-validator';

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
  public status: borrowState;

  @ApiProperty({
    description: 'This field represents the employee uuid',
    minLength: 36,
    maxLength: 36,
  })
  @IsUUID()
  @Length(36,36)
  public employee_uuid: string;

  @ApiProperty({
    description: 'This field represents the borrower uuid',
    minLength: 36,
    maxLength: 36,
  })
  @IsUUID()
  @Length(36,36)
  public borrower_uuid: string;
}