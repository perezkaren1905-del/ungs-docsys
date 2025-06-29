import { Controller, Get, Param, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RequirementTypesService } from "../services/requirement-types.service";
import { RequirementTypeResponseDto } from "../dtos/requirement-type-response.dto";

@Controller('/v1/requirement-types')
export class RequirementTypesController {
  constructor(private readonly requirementTypesService: RequirementTypesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Requirement type by id' })
  @ApiResponse({
    status: 200,
    description: 'Requirement type details',
    type: RequirementTypeResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<RequirementTypeResponseDto> {
    return await this.requirementTypesService.getById(id, authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Requirement types' })
  @ApiResponse({
    status: 200,
    description: 'Requirement type details',
    type: RequirementTypeResponseDto,
  })
  async getAll(@Headers('authorization') authorization: string,): Promise<RequirementTypeResponseDto[]> {
    return await this.requirementTypesService.getAll(authorization);
  }
}