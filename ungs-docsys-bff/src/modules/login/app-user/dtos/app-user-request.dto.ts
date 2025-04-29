import { ApiProperty } from "@nestjs/swagger";

export class AppUserRequestDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}