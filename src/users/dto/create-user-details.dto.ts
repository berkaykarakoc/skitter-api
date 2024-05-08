import { DateDataType } from 'sequelize';

export class CreateUserDetailsDto {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: DateDataType;
  country?: string;
  totalFollowers?: number;
}
