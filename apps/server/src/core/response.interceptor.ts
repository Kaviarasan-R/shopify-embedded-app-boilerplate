import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    return handler.handle().pipe(
      map((output) => {
        let res = null;
        if (output?.success) {
          res = {
            statusCode: HttpStatus.OK,
            message: output.message ?? 'Request Processed Successfully',
            data: output.data ?? null,
            timestamp: new Date().toISOString(),
            path: request.url,
          };
        }
        return res;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
