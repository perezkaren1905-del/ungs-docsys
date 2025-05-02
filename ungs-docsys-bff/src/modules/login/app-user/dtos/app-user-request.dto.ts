import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AppUserRequestDto {
    @ApiProperty({
        description: 'Email of the user',
        maxLength: 100,
        example: 'user@example.com',
      })
    @IsNotEmpty({ message: 'Email is required' })
    @MaxLength(100, { message: 'Email must not exceed 100 characters' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    @ApiProperty({
        description: 'Password of the user',
        minLength: 8,
        maxLength: 255,
        example: 'password123',
      })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(255, { message: 'Password must not exceed 255 characters' })
    password: string;
}