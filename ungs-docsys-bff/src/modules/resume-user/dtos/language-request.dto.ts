import {
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class LanguageRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Language must not exceed 50 characters' })
  language?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Level must not exceed 50 characters' })
  level?: string;
}