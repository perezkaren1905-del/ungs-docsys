import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { JobApplicationApprovalResponseDto } from "../dtos/job-application-approval-response.dto";
import { JobApplicationApprovalRequestDto } from "../dtos/job-application-approval-request.dto";

@Injectable()
export class JobApplicationApprovalsService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<JobApplicationApprovalResponseDto> {
    const url = `${this.urlBase}/v1/job-application-approvals/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getByParams(jobApplicationId: number, authorization: string): Promise<JobApplicationApprovalResponseDto[]> {
    const url = `${this.urlBase}/v1/job-application-approvals`;
    const params = { jobApplicationId };
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers, params}));
    return response.data;
  }

  async create(request: JobApplicationApprovalRequestDto, authorization: string): Promise<JobApplicationApprovalResponseDto> {
    const url = `${this.urlBase}/v1/job-application-approvals`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.post(url, request, { headers }));
    return response.data;
  }
}