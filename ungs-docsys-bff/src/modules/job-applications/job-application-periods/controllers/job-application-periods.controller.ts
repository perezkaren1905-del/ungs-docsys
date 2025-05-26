import { Controller, Get, Param, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JobApplicationPeriodResponseDto } from "../dtos/job-application-period-response.dto";
import { JobApplicationPeriodsService } from "../services/job-application-periods.service";

@Controller('/v1/job-application-periods')
export class JobApplicationPeriodsController {
  constructor(private readonly jobApplicationPeriodsService: JobApplicationPeriodsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Job application statuses by id' })
  @ApiResponse({
    status: 200,
    description: 'Job application statuses details',
    type: JobApplicationPeriodResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<JobApplicationPeriodResponseDto> {
    return await this.jobApplicationPeriodsService.getById(id, authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Job application statuses' })
  @ApiResponse({
    status: 200,
    description: 'Job application statuses details',
    type: JobApplicationPeriodResponseDto,
  })
  async getAll(@Headers('authorization') authorization: string): Promise<JobApplicationPeriodResponseDto[]> {
    return await this.jobApplicationPeriodsService.getAll(authorization);
  }
}