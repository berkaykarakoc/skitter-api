import { DateDataType } from 'sequelize';

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: DateDataType;
  country?: string;
  totalFollowers?: number;
}
