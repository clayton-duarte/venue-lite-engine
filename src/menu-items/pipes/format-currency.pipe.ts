import {
  HttpException,
  PipeTransform,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import Big from 'big.js';

interface PricedInterface {
  price: string;
  [key: string]: unknown;
}

@Injectable()
export class FormatCurrencyPipe implements PipeTransform {
  transform(data: PricedInterface) {
    try {
      data.price = Big(data.price).toFixed(2);
      return data;
    } catch {
      throw new HttpException(
        'price must match the 9,999.99 format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
