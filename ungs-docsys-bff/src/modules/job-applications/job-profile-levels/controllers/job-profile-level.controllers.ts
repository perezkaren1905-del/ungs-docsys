import { Controller, Get, Param, Headers } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JobProfileLevelsService } from "../services/job-profile-levels.service";
import { JobProfileLevelResponseDto } from "../dtos/job-profile-level.dto";

@Controller('/v1/job-profile-levels')
export class JobProfileLevelController {
  constructor(private readonly jobProfileLevelsService: JobProfileLevelsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Job profile level by id' })
  @ApiResponse({
    status: 200,
    description: 'Job profile level details',
    type: JobProfileLevelResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<JobProfileLevelResponseDto> {
    return await this.jobProfileLevelsService.getById(id, authorization);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Job profile levels' })
  @ApiResponse({
    status: 200,
    description: 'Job profile levels details',
    type: JobProfileLevelResponseDto,
  })
  async getAll(@Headers('authorization') authorization: string): Promise<JobProfileLevelResponseDto[]> {
    return await this.jobProfileLevelsService.getAll(authorization);
  }
}