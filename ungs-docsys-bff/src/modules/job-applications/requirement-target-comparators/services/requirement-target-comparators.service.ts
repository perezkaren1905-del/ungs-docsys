import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { RequirementTargetComparatorResponseDto } from "../dtos/requirement-target-comparator-response.dto";

@Injectable()
export class RequirementTargetComparatorsService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<RequirementTargetComparatorResponseDto> {
    const url = `${this.urlBase}/v1/requirement-target-comparators/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<RequirementTargetComparatorResponseDto[]> {
    const url = `${this.urlBase}/v1/requirement-target-comparators`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }
}
