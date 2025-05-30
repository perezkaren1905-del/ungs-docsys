import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { JobApplicationStatusResponseDto } from "../dtos/job-application-status-response.dto";

@Injectable()
export class JobApplicationStatusesService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<JobApplicationStatusResponseDto> {
    const url = `${this.urlBase}/v1/job-application-statuses/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<JobApplicationStatusResponseDto[]> {
    const url = `${this.urlBase}/v1/job-application-statuses`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }
}
