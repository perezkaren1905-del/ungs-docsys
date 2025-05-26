import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { JobApplicationPeriodResponseDto } from "../dtos/job-application-period-response.dto";

@Injectable()
export class JobApplicationPeriodsService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<JobApplicationPeriodResponseDto> {
    const url = `${this.urlBase}/v1/job-application-periods/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<JobApplicationPeriodResponseDto[]> {
    const url = `${this.urlBase}/v1/job-application-periods`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }
}
