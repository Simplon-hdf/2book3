import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator"
import { CreateHumanInformationDto } from "src/human-informations/dto/create-human-information.dto";

export class CreateEmployeeDto extends CreateHumanInformationDto{

    @ApiProperty({
        description: 'This field represents the employee password',
        minLength: 1,
        maxLength: 72,
      })
    @IsString()
    @Length(1, 72)
    public password: string;

    @ApiProperty({
        description: 'This field represents the employee email',
        minLength: 1,
        maxLength: 20,
      })
      @IsEmail()
      @Length(1,80)
      mail: string
}
