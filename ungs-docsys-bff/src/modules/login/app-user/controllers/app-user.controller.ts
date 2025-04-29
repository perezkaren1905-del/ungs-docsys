import { Controller, Post, Body } from "@nestjs/common";
import { AppUserService } from "../services/app-user.service";
import { AppUserRequestDto } from "../dtos/app-user-request.dto";
import { AppUserResponseDto } from "../dtos/app-user-response.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/v1/users/signIn')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    type: AppUserResponseDto,
  })
  async signIn(@Body() request: AppUserRequestDto): Promise<AppUserResponseDto> {
    return await this.appUserService.signIn(request);
  }
}
