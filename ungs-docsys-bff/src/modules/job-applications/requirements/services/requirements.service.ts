import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { RequirementResponseDto } from "../dtos/requirement-response.dto";
import { RequirementCreateRequestDto } from "../dtos/requirement-create-request.dto";
import { RequirementUpdateRequestDto } from "../dtos/requirement-update-request.dto";

@Injectable()
export class RequirementsService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<RequirementResponseDto> {
    const url = `${this.urlBase}/v1/requirements/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<RequirementResponseDto[]> {
    const url = `${this.urlBase}/v1/requirements`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async save(requirementCreateRequest: RequirementCreateRequestDto, authorization: string): Promise<RequirementResponseDto> {
    const url = `${this.urlBase}/v1/requirements`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.post(url, requirementCreateRequest, {headers}));
    return response.data;
  }

  async partiallyUpdate(requirementUpdateRequestDto: RequirementUpdateRequestDto, id: number, authorization: string): Promise<RequirementResponseDto> {
    const url = `${this.urlBase}/v1/requirements/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.put(url, requirementUpdateRequestDto, {headers}));
    return response.data;
  }
}
