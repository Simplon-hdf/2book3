import { IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'This Field represents the book UUID',
    minLength: 36,
    maxLength: 36,
  })
  @IsUUID()
  @Length(36, 36)
  	private book_UUID:'string';

  @ApiProperty({
    description: "This Field represents the book's name",
    minLength: 2,
    maxLength: 40,
    })
  @IsString()
  @Length(2, 40)
  	public name: 'string';

  @ApiProperty({
    description: "This Field represents the book's description",
    minLength: 2,
    maxLength: 500,
    })
  @IsString()
  @Length(2, 500)
  	public description: 'string';
}
