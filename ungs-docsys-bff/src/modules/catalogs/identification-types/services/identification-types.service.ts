import { Injectable } from "@nestjs/common";
import { IdentificationTypeResponseDto } from "../dtos/identification-type-response.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class IdentificationTypesService {

  constructor(private readonly httpService: HttpService) {}

  private readonly urlBase: string = process.env.DOCSYS_URL_MS;

  async getById(id: number, authorization: string): Promise<IdentificationTypeResponseDto> {
    const url = `${this.urlBase}/v1/identification-types/${id}`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }

  async getAll(authorization: string): Promise<IdentificationTypeResponseDto[]> {
    const url = `${this.urlBase}/v1/identification-types`;
    const headers = { authorization };
    const response = await lastValueFrom(this.httpService.get(url, {headers}));
    return response.data;
  }
}
