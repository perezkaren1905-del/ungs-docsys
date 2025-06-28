import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { JobApplicationResumeUserResponseDto } from "../dtos/job-application-resume-user-response.dto";
import { JobApplicationResumeUserRequestDto } from "../dtos/job-application-resume-user-request.dto";

@Injectable()
export class JobApplicationResumeUsersService {

  constructor(private readonly httpService: HttpService) { }

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<JobApplicationResumeUserResponseDto> {
    const url = `${this.urlBase}/v1/job-application-resume-users/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, { headers }));
    return response.data;
  }

  async getByParams(jobApplicationId: number, resumeUserId: number, authorization: string): Promise<JobApplicationResumeUserResponseDto[]> {
    const url = `${this.urlBase}/v1/job-application-resume-users`;
    const headers = { authorization };
    const params = { jobApplicationId, resumeUserId }
    const response = await lastValueFrom(this.httpService.get(url, { headers, params }));
    return response.data;
  }

  async create(request: JobApplicationResumeUserRequestDto, authorization: string): Promise<JobApplicationResumeUserResponseDto> {
    const url = `${this.urlBase}/v1/job-application-resume-users`;
    const response = await lastValueFrom(
      this.httpService.post(url, request, {
        headers: { Authorization: authorization },
      }),
    );
    return response.data;
  }
}
