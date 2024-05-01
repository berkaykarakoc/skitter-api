import { PartialType } from '@nestjs/mapped-types';
import { CreateSkitDto } from './create-skit.dto';

export class UpdateSkitDto extends PartialType(CreateSkitDto) {}
