import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, Length } from "class-validator"
import { CreateHumanInformationDto } from "src/human-informations/dto/create-human-information.dto";


export class CreateAuthorDto extends CreateHumanInformationDto {

}
