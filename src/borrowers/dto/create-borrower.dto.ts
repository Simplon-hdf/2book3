
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateBorrowerDto {

@ApiProperty({
    description: 'This field represents the borrower firstname',
    minLength: 1,
    maxLength: 20,
  })
@IsString()
@Length(1, 20)
public firstName: string;

@ApiProperty({
    description: 'This field represents the borrower lastname',
    minLength: 1,
    maxLength: 30,
  })
@IsString()
@Length(1, 30)
public lastName: string;
}