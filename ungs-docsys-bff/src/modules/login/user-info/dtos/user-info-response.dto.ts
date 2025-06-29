import { ApiProperty } from "@nestjs/swagger";

export class UserInfoResponseDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    identificationType: string;
    @ApiProperty()
    identificationNumber: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    birthDate: Date;
    @ApiProperty()
    nationality: string;
    @ApiProperty()
    cuilCuit: string;
}
