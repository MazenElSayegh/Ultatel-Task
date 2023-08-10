import { Student } from '../schemas/student.schema';
import { IsAlpha, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto extends Student {
  @ApiProperty()
  @IsAlpha()
  fname: string;
  @ApiProperty()
  @IsAlpha()
  lname: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsDate()
  birthdate: Date;
  @ApiProperty()
  gender: 'male' | 'female';
  @ApiProperty()
  @IsAlpha()
  country: string;
}
