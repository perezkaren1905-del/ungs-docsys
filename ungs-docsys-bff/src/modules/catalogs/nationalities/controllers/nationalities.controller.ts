import { Controller, Get, Param } from "@nestjs/common";
import { NationalitiesService } from "../services/nationalities.service";
import { NationalityResponseDto } from "../dtos/nationality-response.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/v1/nationalities')
export class NationalitiesController {
  constructor(private readonly nationalitiesService: NationalitiesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get nationality by id' })
  @ApiResponse({
    status: 200,
    description: 'Nationality details',
    type: NationalityResponseDto,
  })
  async getById(@Param('id') id: number): Promise<NationalityResponseDto> {
    return await this.nationalitiesService.getById(id, 'asd');
  }

  @Get()
  @ApiOperation({ summary: 'Get all nationalities' })
  @ApiResponse({
    status: 200,
    description: 'Nationalities details',
    type: [NationalityResponseDto],
  })
  async getAll(): Promise<NationalityResponseDto[]> {
    return await this.nationalitiesService.getAll('asasd');
  }
}