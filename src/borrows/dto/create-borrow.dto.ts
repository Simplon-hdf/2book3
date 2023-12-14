import { ApiProperty } from "@nestjs/swagger";
import { borrowState } from '@prisma/client';
import { IsDate, IsInt, Length, IsUUID, IsNotEmpty, IsDefined, IsOptional } from 'class-validator';


export class CreateBorrowDto {

  // @ApiProperty({
  //   description: 'This field represents the borrowing start',
  //   minLength: 1,
  //   maxLength: 20,
  // })
  // @IsDate()
  // @Length(1, 20)
  // public started_at: string;

  @ApiProperty({
    description: 'This field represents the borring end time',
    minLength: 1,
    maxLength: 20,
  })
  @IsDate()
  @IsOptional()
  public end_at: Date;

  @ApiProperty({
    description: 'This field represents the borrowing status',
  })
  public status: borrowState;

  @ApiProperty({
    description: 'This field represents the employee UUID',
    minLength: 36,
    maxLength: 36,
  })
  @IsUUID()
  @IsNotEmpty()
    employee_uuid: string;
  

  @ApiProperty({
    description: 'This field represents the borrower UUID',
    minLength: 36,
    maxLength: 36,
  })
  @IsUUID()
  @IsNotEmpty()
    borrower_uuid: string;
  
}