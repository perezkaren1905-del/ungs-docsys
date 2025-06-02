import axios from "axios";
import { JobApplicationResponseDto } from "../dtos/job-application-response.dto";
import { HttpUtilsService } from "../utils/http-utils.service";
import { JobApplicationRequestDto } from "../dtos/job-application-request.dto";

export class JobApplicationsService {
    private static apiUrl = "http://localhost:3000";

    public static async getAll(): Promise<JobApplicationResponseDto[]> {
        try {
            const response = await axios.get<JobApplicationResponseDto[]>(`${this.apiUrl}/v1/job-applications`, HttpUtilsService.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error al obtener postulaciones:", error);
            throw error;
        }
    }

    public static async create(jobApplicationRequestDto: JobApplicationRequestDto): Promise<JobApplicationResponseDto> {
        try {
            const response = await axios.post<JobApplicationResponseDto>(`${this.apiUrl}/v1/job-applications`, jobApplicationRequestDto, HttpUtilsService.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error al registrar postulacion:", error);
            throw error;
        }
    }

    public static async getById(id: number): Promise<JobApplicationResponseDto> {
        try {
            const response = await axios.get<JobApplicationResponseDto>(`${this.apiUrl}/v1/job-applications/${id}`, HttpUtilsService.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error al obtener postulacion:", error);
            throw error;
        }
    }
}