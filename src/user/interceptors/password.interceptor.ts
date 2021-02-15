import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    id: string;
    email: string;
  }> {
    return next.handle().pipe(
      map((doc: UserDocument) => {
        return {
          id: doc.id,
          email: doc.email,
        };
      }),
    );
  }
}
