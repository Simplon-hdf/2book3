
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from "class-validator";

export class CreateBorrowerDto {

@ApiProperty({
  description: 'This Field represents the borrower UUID',
  minLength: 36,
  maxLength: 36,
})
@IsUUID()
@Length(36, 36)
public UUID: string;
}