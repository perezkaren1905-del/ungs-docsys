import {
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class ResumeFileRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(5000, { message: 'File content must not exceed 5000 characters' })
  fileBinary?: string;
}