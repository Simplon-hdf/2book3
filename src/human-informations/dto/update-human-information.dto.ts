import { PartialType } from '@nestjs/swagger';
import { CreateHumanInformationDto } from './create-human-information.dto';

export class UpdateHumanInformationDto extends PartialType(CreateHumanInformationDto) {}
