import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator"

export class CreateEmployeeDto {

    
    @ApiProperty({
        description: 'This field represents the employee firstname',
        minLength: 1,
        maxLength: 20,
      })
    @IsString()
    @Length(1, 20)
    public firstName: string;

    @ApiProperty({
        description: 'This field represents the employee lastname',
        minLength: 1,
        maxLength: 30,
      })
    @IsString()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({
        description: 'This field represents the employee password',
        minLength: 72,
        maxLength: 72,
      })
    @IsString()
    @Length(72, 72)
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
