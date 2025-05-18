import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
    ForbiddenException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { NotModifiedException } from '../exceptions/not-modified.exception';
  
interface AxiosError extends Error {
    isAxiosError?: boolean;
    response?: {
      status?: number;
      data?: any;
    };
}

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error: AxiosError) => {
                if (error.isAxiosError) {
                    const status = error.response?.status;
        
                    switch (status) {
                        case 401:
                            return throwError(() => new UnauthorizedException('Invalid or expired token!'));
                        case 403:
                            return throwError(() => new ForbiddenException('You do not have permission for this action!'));
                        case 304:
                            return throwError(() => new NotModifiedException());
                        default:
                            return throwError(() => new InternalServerErrorException(`External HTTP Error (${status ?? 'unknown'})!`));
                    }
                }
                return throwError(() => new InternalServerErrorException('Unexpected error!'));
            }),
      );
    }
}
  