import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional } from "class-validator";
import { OperatorsEnum } from "../enums/operators.enum";

export class RequirementUpdateRequestDto {
  @ApiProperty({ example: 'Mas de 2 años de experiencia en Java' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  requirementTypeId?: number;

  @ApiProperty({ enum: OperatorsEnum, example: OperatorsEnum.GREATER_THAN })
  @IsEnum(OperatorsEnum)
  @IsOptional()
  operator?: OperatorsEnum;

  @ApiProperty({ example: '2,Java' })
  @IsString()
  @IsOptional()
  expectedValue?: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  requirementTargetComparatorId?: number;
}