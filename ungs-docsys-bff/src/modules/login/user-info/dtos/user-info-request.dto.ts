import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsNumber,
    IsPositive,
    IsDateString,
    Matches
  } from 'class-validator';

export class UserInfoRequestDto {
    @ApiProperty({ example: 1, description: 'Role ID' })
    @IsNotEmpty({ message: 'Role is required' })
    @IsNumber({}, { message: 'Role ID must be a number' })
    @IsPositive({ message: 'Role ID must be a positive number' })
    roleId: number;

    @ApiProperty({ example: 'user@example.com', maxLength: 100 })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    @MaxLength(100, { message: 'Email must not exceed 100 characters' })
    email: string;

    @ApiProperty({ example: 'securePass123', minLength: 8, maxLength: 255 })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(255, { message: 'Password must not exceed 255 characters' })
    password: string;

    @ApiProperty({ example: 'John', maxLength: 150 })
    @IsNotEmpty({ message: 'First name is required' })
    @MaxLength(150, { message: 'First name must not exceed 150 characters' })
    firstName: string;

    @ApiProperty({ example: 'Doe', maxLength: 150 })
    @IsNotEmpty({ message: 'Last name is required' })
    @MaxLength(150, { message: 'Last name must not exceed 150 characters' })
    lastName: string;

    @ApiProperty({ example: 2, description: 'Identification type ID' })
    @IsNotEmpty({ message: 'Identification type is required' })
    @IsNumber({}, { message: 'Identification type ID must be a number' })
    @IsPositive({ message: 'Identification type ID must be a positive number' })
    identificationTypeId: number;

    @ApiProperty({ example: '12345678', maxLength: 50 })
    @IsNotEmpty({ message: 'Identification number is required' })
    @Matches(/^\d+$/, { message: 'Identification number must contain only digits' })
    @MaxLength(50, { message: 'Identification number must not exceed 50 characters' })
    identificationNumber: string;

    @ApiProperty({ example: '20123456783', description: 'CUIL/CUIT (11 digits)' })
    @IsNotEmpty({ message: 'CUIL/CUIT is required' })
    @Matches(/^\d{11}$/, { message: 'CUIL/CUIT must be a string of exactly 11 digits' })
    cuilCuit: string;

    @ApiProperty({ example: '+123456789', maxLength: 50 })
    @IsNotEmpty({ message: 'Phone is required' })
    @Matches(/^\+?\d{6,15}$/, { message: 'Phone must contain only digits and may start with + (6–15 digits total)' })
    @MaxLength(50, { message: 'Phone must not exceed 50 characters' })
    phone: string;
    
    @ApiProperty({ example: '1990-01-01', description: 'Birth date (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'Birth date is required' })
    @IsDateString({}, { message: 'Birth date must be a valid date' })
    birthDate: Date;
    
    @ApiProperty({ example: 1, description: 'Nationality ID' })
    @IsNotEmpty({ message: 'Nationality is required' })
    @IsNumber({}, { message: 'Nationality ID must be a number' })
    @IsPositive({ message: 'Nationality ID must be a positive number' })
    nationalityId: number;
}