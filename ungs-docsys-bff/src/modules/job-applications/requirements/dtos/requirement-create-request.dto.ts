import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import { OperatorsEnum } from "../enums/operators.enum";

export class RequirementCreateRequestDto {
  @ApiProperty({ example: 'Mas de 2 años de experiencia en Java' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  requirementTypeId: number;

  @ApiProperty({ enum: OperatorsEnum, example: OperatorsEnum.GREATER_THAN })
  @IsEnum(OperatorsEnum)
  @IsNotEmpty()
  operator: OperatorsEnum;

  @ApiProperty({ example: '2,Java' })
  @IsString()
  @IsNotEmpty()
  expectedValue: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  requirementTargetComparatorId: number;
}