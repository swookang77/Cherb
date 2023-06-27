import { PartialType } from '@nestjs/mapped-types';
import { CreateVitaminDto } from './create-vitamin.dto';

export class UpdateVitaminDto extends PartialType(CreateVitaminDto) {}
