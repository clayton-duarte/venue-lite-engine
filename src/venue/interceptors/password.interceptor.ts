import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { VenueDocument } from '../schemas/venue.schema';

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
      map((doc: VenueDocument) => {
        return {
          id: doc.id,
          email: doc.email,
        };
      }),
    );
  }
}
