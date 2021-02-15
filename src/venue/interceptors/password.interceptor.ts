import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { VenueDocument, Venue } from '../schemas/venue.schema';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Omit<Venue, 'password'>> {
    return next.handle().pipe(
      map((doc: VenueDocument) => {
        const _doc = doc.toObject();
        const { password, ...safeData } = _doc;
        return safeData;
      }),
    );
  }
}
