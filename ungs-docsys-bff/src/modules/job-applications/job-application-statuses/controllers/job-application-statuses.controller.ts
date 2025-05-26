import { Controller, Get, Param, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JobApplicationStatusResponseDto } from "../dtos/job-application-status-response.dto";
import { JobApplicationStatusesService } from "../services/job-application-statuses.service";

@Controller('/v1/job-application-statuses')
export class JobApplicationStatusesController {
  constructor(private readonly jobApplicationStatusesService: JobApplicationStatusesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Job application statuses by id' })
  @ApiResponse({
    status: 200,
    description: 'Job application statuses details',
    type: JobApplicationStatusResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<JobApplicationStatusResponseDto> {
    return await this.jobApplicationStatusesService.getById(id, authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Job application statuses' })
  @ApiResponse({
    status: 200,
    description: 'Job application statuses details',
    type: JobApplicationStatusResponseDto,
  })
  async getAll(@Headers('authorization') authorization: string): Promise<JobApplicationStatusResponseDto[]> {
    return await this.jobApplicationStatusesService.getAll(authorization);
  }
}