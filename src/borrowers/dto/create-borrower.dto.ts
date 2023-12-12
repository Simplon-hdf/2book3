
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from "class-validator";

export class CreateBorrowerDto {

@ApiProperty({
    description: 'This field represents the borrower firstname',
    minLength: 1,
    maxLength: 20,
  })
@IsString()
@Length(1, 20)
public first_name: string;

@ApiProperty({
    description: 'This field represents the borrower lastname',
    minLength: 1,
    maxLength: 30,
  })
@IsString()
@Length(1, 30)
public last_name: string;

@ApiProperty({
  description: 'This Field represents the borrower UUID',
  minLength: 36,
  maxLength: 36,
})
@IsUUID()
@Length(36, 36)
public UUID: string;
}