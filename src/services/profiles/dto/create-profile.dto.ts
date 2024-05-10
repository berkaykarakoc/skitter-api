import { DateDataType } from 'sequelize';

export class CreateProfileDto {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: DateDataType;
  country?: string;
  totalFollowers?: number;
  userId: string;
}
