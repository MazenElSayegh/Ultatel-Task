import { Student } from '../schemas/student.schema';
import { IsAlpha, IsEmail, IsDate, IsEnum } from 'class-validator';

export class CreateStudentDto extends Student {
  @IsAlpha()
  fname: string;
  @IsAlpha()
  lname: string;
  @IsEmail()
  email: string;
  @IsDate()
  birthdate: Date;
  @IsAlpha()
  country: string;
}
