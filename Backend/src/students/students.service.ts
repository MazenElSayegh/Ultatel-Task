import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentModel.create(createStudentDto);
    return student;
  }

  async findAll(): Promise<Student[]> {
    return await this.studentModel.find();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('No such student with this id');
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    this.findOne(id);
    return await this.studentModel.findByIdAndUpdate(id, updateStudentDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    // const deletedStudent = await this.findOne(id);
    return await this.studentModel.findByIdAndDelete(id);
  }
}
