import { Controller, Get, Param, Headers, Query, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JobApplicationApprovalsService } from "../services/job-application-approvals.service";
import { JobApplicationApprovalResponseDto } from "../dtos/job-application-approval-response.dto";
import { JobApplicationApprovalRequestDto } from "../dtos/job-application-approval-request.dto";

@Controller('/v1/job-application-approvals')
export class JobApplicationApprovalsController {
    constructor(private readonly jobApplicationApprovalsService: JobApplicationApprovalsService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get Job application approval by id' })
    @ApiResponse({
        status: 200,
        description: 'Job application approval details',
        type: JobApplicationApprovalResponseDto,
    })
    async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<JobApplicationApprovalResponseDto> {
        return await this.jobApplicationApprovalsService.getById(id, authorization);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Job application approvals' })
    @ApiResponse({
        status: 200,
        description: 'Job application approvals details',
        type: [JobApplicationApprovalResponseDto],
    })
    async getByParams(@Headers('authorization') authorization: string, @Query('jobApplicationId') jobApplicationId: number): Promise<JobApplicationApprovalResponseDto[]> {
        return await this.jobApplicationApprovalsService.getByParams(jobApplicationId, authorization);
    }

    @Post()
    @ApiOperation({ summary: 'Save Requirement' })
    @ApiResponse({
        status: 200,
        description: 'Save Requirement',
        type: JobApplicationApprovalResponseDto,
    })
    async save(
        @Headers('authorization') authorization: string,
        @Body() jobApplicationApprovalRequestDto: JobApplicationApprovalRequestDto): Promise<JobApplicationApprovalResponseDto> {
        return await this.jobApplicationApprovalsService.create(jobApplicationApprovalRequestDto, authorization);
    }
}