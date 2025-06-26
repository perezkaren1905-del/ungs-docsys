import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength
} from 'class-validator';

export class CertificationRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Name must not exceed 150 characters' })
  name?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Issue date must be a valid ISO 8601 date string' })
  issueDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Expiration date must be a valid ISO 8601 date string' })
  expirationDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250, { message: 'Certification URL must not exceed 250 characters' })
  certificationUrl?: string;
}