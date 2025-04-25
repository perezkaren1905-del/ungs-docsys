import { Controller, Get, Param } from "@nestjs/common";
import { IdentificationTypesService } from "../services/identification-types.service";
import { IdentificationTypeResponseDto } from "../dtos/identification-type-response.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/v1/identification-types')
export class IdentificationTypesController {
  constructor(private readonly identificationTypesService: IdentificationTypesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Identification Type by id' })
  @ApiResponse({
    status: 200,
    description: 'Identification Type details',
    type: IdentificationTypeResponseDto,
  })
  async getById(@Param('id') id: number): Promise<IdentificationTypeResponseDto> {
    return await this.identificationTypesService.getById(id, 'asd');
  }

  @Get()
  @ApiOperation({ summary: 'Get all Identification Types' })
  @ApiResponse({
    status: 200,
    description: 'Identification Types details',
    type: IdentificationTypeResponseDto,
  })
  async getAll(): Promise<IdentificationTypeResponseDto[]> {
    return await this.identificationTypesService.getAll('asasd');
  }
}