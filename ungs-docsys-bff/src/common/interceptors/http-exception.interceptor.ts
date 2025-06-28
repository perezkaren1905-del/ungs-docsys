import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    InternalServerErrorException,
    HttpException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
  
interface AxiosError extends Error {
  isAxiosError?: boolean;
  response?: {
    status?: number;
    data?: RecruitmentExceptionResponse;
  };
}

interface RecruitmentExceptionResponse {
  httpStatusDescription: string;
  httpStatusCode: number;
  message: string;
  timestamp: string;
}

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: AxiosError) => {
        if (error.isAxiosError && error.response?.data) {
          const recruitmenException = error.response.data;

          return throwError(() =>
            new HttpException(
              {
                statusCode: recruitmenException.httpStatusCode,
                error: recruitmenException.httpStatusDescription,
                message: recruitmenException.message,
                timestamp: recruitmenException.timestamp,
              },
              recruitmenException.httpStatusCode
            )
          );
        }

        return throwError(() =>
          new InternalServerErrorException('Error inesperado del sistema')
        );
      })
    );
  }
}