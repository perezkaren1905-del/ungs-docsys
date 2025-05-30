import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsNumber,
    Min,
    Max,
    IsPositive
} from 'class-validator';
import { Type } from 'class-transformer';

export class JobApplicationRequestDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    @MaxLength(150, { message: 'Title must not exceed 150 characters' })
    title: string;
  
    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    @MaxLength(5000, { message: 'Description must not exceed 5000 characters' })
    description: string;
  
    @IsNotEmpty({ message: 'Job Application Period ID is required' })
    @IsNumber()
    @IsPositive({ message: 'Job Application Period ID must be a positive number' })
    jobApplicationPeriodId: number;
  
    @IsNotEmpty({ message: 'Minimum Approvers is required' })
    @IsNumber()
    @Min(1, { message: 'Minimum Approvers must be at least one approver' })
    @Max(5, { message: 'Minimum Approvers must not exceed 5' })
    minApprovers: number;
  
    @IsNotEmpty({ message: 'Reason is required' })
    @IsString()
    @MaxLength(500, { message: 'Reason must not exceed 500 characters' })
    reason: string;
  
    @IsNotEmpty({ message: 'Year Period is required' })
    @IsNumber()
    @Type(() => Number)
    yearPeriod: number;
}