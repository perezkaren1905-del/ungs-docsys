import { OperatorsEnum } from "../enums/operators.enum";

export class RequirementRequestDto {
  description: string;
  requirementTypeId: number;
  operator: OperatorsEnum;
  expectedValue: string;
  requirementTargetComparatorId: number;
}