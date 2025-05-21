import {jwtDecode} from 'jwt-decode';
import { AppUserClaimDto } from '../dtos/user-claim.dto';


type JwtPayload = {
  exp: number;
  iat: number;
  sub: string;
  ["user-data"]: AppUserClaimDto;
};

export class JwtService {
  public static getClaims(): AppUserClaimDto | null {
    const rawToken = localStorage.getItem('token');
    if (!rawToken) return null;

    const token = rawToken.startsWith("Bearer ") ? rawToken.slice(7) : rawToken;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded["user-data"];
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
}