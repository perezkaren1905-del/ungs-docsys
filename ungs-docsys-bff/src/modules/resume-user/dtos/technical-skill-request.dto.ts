import {
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class TechnicalSkillRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Level must not exceed 50 characters' })
  level?: string;
}