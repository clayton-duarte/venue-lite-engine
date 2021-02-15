import { IsNotEmpty, Matches } from 'class-validator';

import { CreateVenueDto } from './create-venue.dto';

export class CompleteVenueDto extends CreateVenueDto {
  @IsNotEmpty()
  restaurantName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @Matches(/^[A-Z]{2}$/, {
    message: 'provState country must be a 2 letter code',
  })
  provState: string;

  @Matches(
    /[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d|\d{5}([ \-]\d{4})?/,
    {
      message: 'postalZip must be a valid US zip code or CA postal code',
    },
  )
  postalZip: string;

  @Matches(/^[A-Z]{2}$/, {
    message: 'country must be a 2 letter code',
  })
  country: string;

  @Matches(/^[A-Z]{3}$/, {
    message: 'currency must be an ISO 4217 3-letter currency code',
  })
  currency: string;

  @Matches(/^[a-z]{2}-[A-Z]{2}$/, {
    message: 'locale must be a locale identifier such like en-CA',
  })
  locale: string;

  @Matches(/^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/, {
    message: 'timeZone must match the format +05:30',
  })
  timeZone: string;
}
