import axios from "axios";
import { NationalityResponseDto } from "../dtos/nationality-response.dto";

export class NationalititesService {
    private static apiUrl = "http://localhost:3000";

    public static async getAll(): Promise<NationalityResponseDto[]> {
        try {
            //const response = await axios.get<NationalityResponseDto[]>(`${this.apiUrl}/nationalities`);
            const response = {
                data: [
                    {code: '001', description: 'Argentina', iso3: 'ARG'},
                    {code: '002', description: 'Bolivia', iso3: 'BOL'},
                    {code: '003', description: 'Chile', iso3: 'CHL'}
                ]
            }
            return response.data;
        } catch (error) {
            console.error("Error al obtener países:", error);
            throw error;
        }
    }
}