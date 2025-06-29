import { Body, Controller, Get, Param, Patch, Post, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RequirementResponseDto } from "../dtos/requirement-response.dto";
import { RequirementsService } from "../services/requirements.service";
import { RequirementCreateRequestDto } from "../dtos/requirement-create-request.dto";

@Controller('/v1/requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Requirement type by id' })
  @ApiResponse({
    status: 200,
    description: 'Requirement type details',
    type: RequirementResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<RequirementResponseDto> {
    return await this.requirementsService.getById(id, authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Requirement types' })
  @ApiResponse({
    status: 200,
    description: 'Requirement type details',
    type: RequirementResponseDto,
  })
  async getAll(
    @Headers('authorization') authorization: string,
  ): Promise<RequirementResponseDto[]> {
    return await this.requirementsService.getAll(authorization);
  }

  @Post()
  @ApiOperation({ summary: 'Save Requirement' })
  @ApiResponse({
    status: 200,
    description: 'Save Requirement',
    type: RequirementResponseDto,
  })
  async save(
    @Headers('authorization') authorization: string,
    @Body() requirementCreateRequest: RequirementCreateRequestDto): Promise<RequirementResponseDto> {
    return await this.requirementsService.save(requirementCreateRequest, authorization);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update' })
  @ApiResponse({
    status: 200,
    description: 'Partially update Requirement',
    type: RequirementResponseDto,
  })
  async partiallyUpdate(
    @Headers('authorization') authorization: string,
    @Body() requirementCreateRequest: RequirementCreateRequestDto,
    @Param('id') id: number): Promise<RequirementResponseDto> {
    return await this.requirementsService.partiallyUpdate(requirementCreateRequest, id, authorization);
  }
}