import { RequirementTargetComparatorResponseDto } from "../../requirement-target-comparators/dtos/requirement-target-comparator-response.dto";
import { RequirementTypeResponseDto } from "../../requirement-types/dtos/requirement-type-response.dto";

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