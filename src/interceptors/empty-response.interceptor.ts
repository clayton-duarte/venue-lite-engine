import {
  ExecutionContext,
  NestInterceptor,
  HttpException,
  CallHandler,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((response) => {
        if (response == null) {
          throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return response;
      }),
    );
  }
}
