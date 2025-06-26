import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional
} from 'class-validator';

export class ContactRequestDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(7, { message: 'Phone number must be at least 7 characters' })
  @MaxLength(20, { message: 'Phone number must not exceed 20 characters' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Address must not exceed 150 characters' })
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'LinkedIn URL must not exceed 100 characters' })
  linkedin?: string;
}