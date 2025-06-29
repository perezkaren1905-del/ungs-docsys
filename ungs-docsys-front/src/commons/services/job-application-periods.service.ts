import axios from "axios";
import { JobApplicationPeriodResponseDto } from "../dtos/job-application-period-response.dto";
import { HttpUtilsService } from "../utils/http-utils.service";

export class JobApplicationPeriodsService {
    private static apiUrl = "http://localhost:3000";

    public static async getAll(): Promise<JobApplicationPeriodResponseDto[]> {
        try {
            const response = await axios.get<JobApplicationPeriodResponseDto[]>(`${this.apiUrl}/v1/job-application-periods`, HttpUtilsService.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error al obtener países:", error);
            throw error;
        }
    }
}