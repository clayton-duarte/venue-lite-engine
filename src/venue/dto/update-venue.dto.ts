import { PartialType } from '@nestjs/mapped-types';

import { CompleteVenueDto } from './complete-venue.dto';

export class UpdateVenueDto extends PartialType(CompleteVenueDto) {}
