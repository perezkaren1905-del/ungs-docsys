import { Controller, Get, Headers } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserResponseDto } from "../dtos/users-response.dto";

@Controller("v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "List of users with roles and names",
    type: [UserResponseDto],
  })
  async getAll(@Headers("authorization") authHeader: string): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers(authHeader);
  }
}
