import { ApiProperty } from "@nestjs/swagger";

export class NationalityResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    code: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    iso2: string;
    @ApiProperty()
    iso3: string;
}