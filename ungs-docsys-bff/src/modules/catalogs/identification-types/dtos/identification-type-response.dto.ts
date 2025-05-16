import { ApiProperty } from "@nestjs/swagger";

export class IdentificationTypeResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    code: string;
    @ApiProperty()
    description: string;
}