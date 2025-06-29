import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { RequirementTypeResponseDto } from "../dtos/requirement-type-response.dto";

@Injectable()
export class RequirementTypesService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<RequirementTypeResponseDto> {
    const url = `${this.urlBase}/v1/requirement-types/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<RequirementTypeResponseDto[]> {
    const url = `${this.urlBase}/v1/requirement-types`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }
}
