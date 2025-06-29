export class HttpUtilsService {

    public static getAuthHeaders(): { headers: { Authorization: string } } {
        const token = localStorage.getItem('token');

        return {
            headers: {
                Authorization: `Bearer ${token ?? ''}`
            }
        };
    }
}