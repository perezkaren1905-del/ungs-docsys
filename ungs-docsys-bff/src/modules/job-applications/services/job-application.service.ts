import { Injectable } from "@nestjs/common";
import { JobApplicationRequestDto } from "../dtos/job-application-request.dto";
import { JobApplicationUpdateRequestDto } from "../dtos/job-application-update-request.dts";
import { JobApplicationResponseDto } from "../dtos/job-application-response.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class JobApplicationService {
    constructor(private readonly httpService: HttpService) {}

    private readonly urlBase: string = process.env.DOCSYS_URL_MS;

    async create(request: JobApplicationRequestDto, authHeader: string): Promise<JobApplicationResponseDto> {
        const url = `${this.urlBase}/v1/job-applications/create`;
        const response = await lastValueFrom(
            this.httpService.post(url, request, {
            headers: { Authorization: authHeader },
            }),
        );
        return response.data;
    }

    async delete(id: number, authToken: string): Promise<boolean> {
        const url = `${this.urlBase}/v1/job-applications/${id}/delete`;

        try {
            await lastValueFrom(
            this.httpService.patch(url, null, {
                headers: {
                Authorization: `Bearer ${authToken}`,
                },
            }),
            );
            return true;
        } catch (error) {
            if (error.response?.status === 304) {
                return false;
            }
            throw error;
        }
    }
      
    async update(id: number, request: JobApplicationUpdateRequestDto, authToken: string): Promise<JobApplicationResponseDto> {
        const url = `${this.urlBase}/v1/job-applications/${id}`;
        const response = await lastValueFrom(
          this.httpService.patch(url, request, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
        );
        return response.data;
    }
}