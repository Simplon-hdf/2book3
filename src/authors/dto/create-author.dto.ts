import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, Length } from "class-validator"


export class CreateAuthorDto {


    @ApiProperty({
        description: 'This field represents the authors firstname',
        minLength: 1,
        maxLength: 20,
    })
    @IsString()
    @Length(1, 20)
    public firstName: string;

    @ApiProperty({
        description: 'This field represents the authors lastname',
        minLength: 1,
        maxLength: 30,
    })
    @IsString()
    @Length(1, 30)
    public lastName: string;
}
