import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { JobProfileLevelResponseDto } from "../dtos/job-profile-level.dto";

@Injectable()
export class JobProfileLevelsService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<JobProfileLevelResponseDto> {
    const url = `${this.urlBase}/v1/job-profile-levels/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<JobProfileLevelResponseDto[]> {
    const url = `${this.urlBase}/v1/job-profile-levels`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }
}
