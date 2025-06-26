import {
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

export class EducationRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Institute name must not exceed 150 characters' })
  instituteName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Degree level must not exceed 20 characters' })
  degreeLevel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Degree must not exceed 150 characters' })
  degree?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Field of study must not exceed 150 characters' })
  fieldOfStudy?: string;
}