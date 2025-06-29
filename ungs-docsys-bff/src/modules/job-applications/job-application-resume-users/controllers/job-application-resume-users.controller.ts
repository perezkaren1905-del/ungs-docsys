import { Controller, Get, Param, Headers, Query, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JobApplicationResumeUserResponseDto } from "../dtos/job-application-resume-user-response.dto";
import { JobApplicationResumeUserRequestDto } from "../dtos/job-application-resume-user-request.dto";
import { JobApplicationResumeUsersService } from "../services/job-application-resume-users.service";


@Controller('/v1/job-application-resume-users')
export class JobApplicationResumeUsersController {
  constructor(private readonly jobApplicationResumeUsersService: JobApplicationResumeUsersService) { }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get JobApplicationResumeUser by id' })
  @ApiResponse({
    status: 200,
    description: 'Job aJobApplicationResumeUser details',
    type: JobApplicationResumeUserResponseDto,
  })
  async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<JobApplicationResumeUserResponseDto> {
    return await this.jobApplicationResumeUsersService.getById(id, authorization);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all JobApplicationResumeUser by params' })
  @ApiResponse({
    status: 200,
    description: 'Job JobApplicationResumeUser details',
    type: [JobApplicationResumeUserResponseDto],
  })
  async getByParams(@Headers('authorization') authorization: string, @Query('jobApplicationId') jobApplicationId?: number, @Query('resumeUserId') resumerUserId?: number): Promise<JobApplicationResumeUserResponseDto[]> {
    return await this.jobApplicationResumeUsersService.getByParams(authorization, jobApplicationId, resumerUserId);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create JobApplicationResumeUser' })
  @ApiResponse({
    status: 200,
    description: 'Successfully created JobApplicationResumeUser',
    type: JobApplicationResumeUserRequestDto
  })
  async create(@Headers('authorization') authorization: string, @Body() request: JobApplicationResumeUserRequestDto): Promise<JobApplicationResumeUserResponseDto> {
    return await this.jobApplicationResumeUsersService.create(request, authorization);
  }
}