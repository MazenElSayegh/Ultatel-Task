import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsDate } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
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
