import { RequirementTargetComparatorResponseDto } from "./requirement-target-comparator-response.dto";
import { RequirementTypeResponseDto } from "./requirement-type-response.dto";

export class RequirementResponseDto {
    id: number;
    description: string;
    requirementType: RequirementTypeResponseDto;
    operator: string;
    expectedValue: string;
    active: boolean;
    createdDate: Date;
    updatedDate: Date;
    requirementTargetComparator: RequirementTargetComparatorResponseDto;
  }