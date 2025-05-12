import { ApiProperty } from "@nestjs/swagger";

export class AppUserResponseDto {
    @ApiProperty()
    token: string;
}