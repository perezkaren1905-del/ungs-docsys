import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { UserResponseDto } from "../dtos/users-response.dto";

@Injectable()
export class UsersService {
  private readonly urlBase = process.env.DOCSYS_URL_MS; // misma URL base que usás en los otros servicios

  constructor(private readonly httpService: HttpService) {}

  async getAllUsers(authHeader: string): Promise<UserResponseDto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserResponseDto[]>(`${this.urlBase}/v1/users`, {
        headers: { Authorization: authHeader },
      })
    );
    return data;
  }
}
