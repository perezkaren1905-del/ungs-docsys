import { Injectable } from "@nestjs/common";
import { AppUserResponseDto } from "../dtos/app-user-response.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { AppUserRequestDto } from "../dtos/app-user-request.dto";

@Injectable()
export class AppUserService {
    constructor(private readonly httpService: HttpService) {}

    private readonly urlBase: string = process.env.DOCSYS_URL_MS;

    async signIn(request: AppUserRequestDto): Promise<AppUserResponseDto> {
        const url = `${this.urlBase}/v1/users/signIn`;
        const response = await lastValueFrom(this.httpService.post(url, request));
        return response.data;
    }
}