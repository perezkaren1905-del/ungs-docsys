import { Controller, Post, Body } from "@nestjs/common";
import { UserInfoService } from "../services/user-info.service";
import { UserInfoRequestDto } from "../dtos/user-info-request.dto";
import { UserInfoResponseDto } from "../dtos/user-info-response.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/v1/auth/register')
export class UserInfoController {
    constructor(private readonly userInfoService: UserInfoService) {}

    @Post()
    @ApiOperation({ summary: 'Sign Up' })
    @ApiResponse({
    status: 200,
        description: 'Successfully signed in',
        type: UserInfoResponseDto,
    })
    async signUp(@Body() request: UserInfoRequestDto): Promise<UserInfoResponseDto> {
        return await this.userInfoService.signUp(request);
    }
}