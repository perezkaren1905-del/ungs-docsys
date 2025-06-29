import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class JobApplicationResumeUserRequestDto {
    @IsNumber()
    @ApiProperty()
    jobApplicationId: number;
    @IsNumber()
    @ApiProperty()
    resumeUserId: number;
}