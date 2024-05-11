import { DateDataType } from 'sequelize';

export class CreateProfileDto {
  username: string;
  email: string;
  name?: string;
  dateOfBirth?: DateDataType;
  country?: string;
  totalFollowers?: number;
  userId: string;
}
