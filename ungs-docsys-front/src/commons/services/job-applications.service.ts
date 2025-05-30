import axios from "axios";
import { JobApplicationResponseDto } from "../dtos/job-application-response.dto";
import { HttpUtilsService } from "../utils/http-utils.service";

export class JobApplicationsService {
    private static apiUrl = "http://localhost:3000";

    public static async getAll(): Promise<JobApplicationResponseDto[]> {
        try {
            const response = await axios.get<JobApplicationResponseDto[]>(`${this.apiUrl}/v1/job-applications`, HttpUtilsService.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error al obtener países:", error);
            throw error;
        }
    }
}