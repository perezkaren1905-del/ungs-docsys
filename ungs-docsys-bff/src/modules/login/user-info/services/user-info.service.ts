import { Injectable } from "@nestjs/common";
import { UserInfoRequestDto } from "../dtos/user-info-request.dto";
import { UserInfoResponseDto } from "../dtos/user-info-response.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";


@Injectable()
export class UserInfoService {
    constructor(private readonly httpService: HttpService) {}

    private readonly urlBase: string = process.env.DOCSYS_URL_MS;

    async signUp(request: UserInfoRequestDto): Promise<UserInfoResponseDto> {
        const url = `${this.urlBase}/v1/users/signUp`;
        const response = await lastValueFrom(this.httpService.post(url, request));
        return response.data;
    }
}