import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JobApplicationApprovalRequestDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Job Application ID is required' })
    @IsNumber({}, { message: 'Job Application ID must be a number' })
    jobApplicationId: number;
    @ApiProperty()
    @IsNotEmpty({ message: 'Approved is required' })
    @IsBoolean({ message: 'Approved must be a boolean' })
    approved: boolean;
    @ApiProperty()
    @IsNotEmpty({ message: 'Reason is required' })
    @IsString({ message: 'Reason must be a string' })
    reason: string;
}