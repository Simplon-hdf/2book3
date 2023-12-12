import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, Length } from "class-validator"


export class CreateAuthorDto {

    @ApiProperty({
        description: 'This Field represents the book UUID',
        minLength: 36,
        maxLength: 36,
    })
    @IsUUID()
    @Length(36, 36)
    private UUID: string;

    @ApiProperty({
        description: 'This field represents the author firstname',
        minLength: 1,
        maxLength: 20,
    })
    @IsString()
    @Length(1, 20)
    public firstName: string;

    @ApiProperty({
        description: 'This field represents the author lastname',
        minLength: 1,
        maxLength: 30,
    })
    @IsString()
    @Length(1, 30)
    public lastName: string;
}
