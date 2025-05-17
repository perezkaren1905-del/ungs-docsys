import { Controller, Get, Param, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RequirementTargetComparatorResponseDto } from "../dtos/requirement-target-comparator-response.dto";
import { RequirementTargetComparatorsService } from "../services/requirement-target-comparators.service";

@Controller('/v1/requirement-target-comparators')
export class RequirementTargetComparatorsController {
  constructor(private readonly requirementTargetComparatorsService: RequirementTargetComparatorsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Requirement Target Comparator type by id' })
  @ApiResponse({
    status: 200,
    description: 'Requirement Target Comparator details',
    type: RequirementTargetComparatorResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<RequirementTargetComparatorResponseDto> {
    return await this.requirementTargetComparatorsService.getById(id, authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Requirement Target Comparator' })
  @ApiResponse({
    status: 200,
    description: 'Requirement Target Comparator details',
    type: RequirementTargetComparatorResponseDto,
  })
  async getAll(@Headers('authorization') authorization: string): Promise<RequirementTargetComparatorResponseDto[]> {
    return await this.requirementTargetComparatorsService.getAll(authorization);
  }
}