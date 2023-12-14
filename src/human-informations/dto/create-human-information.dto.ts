import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHumanInformationDto {
  @ApiProperty({
    description: 'This Field represents the name of the person',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @Length(2, 20)
  	public first_name: string;

  @ApiProperty({
    description: "This Field represents the last name of the person",
    minLength: 2,
    maxLength: 30,
    })
  @IsString()
  @Length(2, 30)
  	public last_name: string;
}
