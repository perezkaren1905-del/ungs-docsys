import axios from "axios";
import { UserResponseDto } from "../../dtos/user-response.dto";

export class UsersService {
  private static apiUrl = import.meta.env.VITE_DOCSYS_BFF_URL;

  public static async getAll(token: string): Promise<UserResponseDto[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/v1/users`, {
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }
}