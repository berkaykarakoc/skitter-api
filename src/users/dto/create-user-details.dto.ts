import { DateDataType } from 'sequelize';

export class CreateUserDetailsDto {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: DateDataType;
  country: string;
  totalFollowers: number;
}
