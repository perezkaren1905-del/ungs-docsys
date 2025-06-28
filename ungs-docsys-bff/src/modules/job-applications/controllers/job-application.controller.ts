import { Controller, Post, Patch, Body, Param, Headers, HttpCode, HttpStatus, UnauthorizedException, HttpException, Delete, Get, Res} from '@nestjs/common';
import { JobApplicationService } from '../services/job-application.service';
import { JobApplicationRequestDto } from '../dtos/job-application-request.dto';
import { JobApplicationUpdateRequestDto } from '../dtos/job-application-update-request.dts';
import { JobApplicationResponseDto } from '../dtos/job-application-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller("/v1/job-applications")
export class JobApplicationController {
    constructor(private readonly jobApplicationService: JobApplicationService) { }

    @Post()
    @ApiOperation({ summary: 'Create Job Application' })
    @ApiResponse({
        status: 200,
        description: 'Successfully created job application',
        type: JobApplicationResponseDto
    })
    async create(@Body() request: JobApplicationRequestDto, @Headers('authorization') authHeader: string): Promise<JobApplicationResponseDto> {
        return this.jobApplicationService.create(request, authHeader);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete Job Application by ID' })
    @ApiResponse({
        status: 204,
        description: 'Successfully deleted (soft delete)'
    })
    @ApiResponse({
        status: 304,
        description: 'Not modified'
    })
    async delete(@Param('id') id: number, @Headers('authorization') authHeader: string): Promise<void> {
        const token = this.extractToken(authHeader);
        const deleted = await this.jobApplicationService.delete(id, token);

        if (!deleted) {
            throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED);
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update Job Application by ID' })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated job application',
        type: JobApplicationResponseDto
    })
    async update(
        @Param('id') id: number, @Body() request: JobApplicationUpdateRequestDto, @Headers('authorization') authHeader: string): Promise<JobApplicationResponseDto> {
        const token = authHeader?.replace('Bearer ', '');
        return this.jobApplicationService.update(id, request, token);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Requirement types' })
    @ApiResponse({
        status: 200,
        description: 'Requirement type details',
        type: [JobApplicationResponseDto],
    })
    async getAll(@Headers('authorization') authorization: string,): Promise<JobApplicationResponseDto[]> {
        return await this.jobApplicationService.getAll(authorization);
    }

    private extractToken(authHeader: string): string {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token is missing or malformed');
        }
        return authHeader.replace('Bearer ', '');
    }

    @Get(':id')
      @ApiOperation({ summary: 'Get Job application by id' })
      @ApiResponse({
        status: 200,
        description: 'Job application details',
        type: JobApplicationResponseDto,
      })
      async getById(@Headers('authorization') authorization: string, @Param('id') id: number): Promise<JobApplicationResponseDto> {
        return await this.jobApplicationService.getById(id, authorization);
      }

    @Get(':id/export')
    @ApiOperation({ summary: 'Export job application to Excel' })
    @ApiResponse({ status: 200, description: 'Excel file downloaded' })
    async export(
        @Headers('authorization') authorization: string, 
        @Param('id') id: number, 
        @Res() res: Response): Promise<void> {
        const { data, headers } = await this.jobApplicationService.export(id, authorization);

        res.set({
            'Content-Type': headers['content-type'] || 'application/octet-stream',
            'Content-Disposition': headers['content-disposition'],
        });

        res.send(data);
    }
}