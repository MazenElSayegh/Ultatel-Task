import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created student object as response',
    type: CreateStudentDto,
  })
  @ApiBadRequestResponse({
    description: "Student wasn't created, try again later",
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'All students objects',
    type: [CreateStudentDto],
  })
  @ApiBadRequestResponse({
    description: 'Bad request, try again later',
  })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Found student object as response',
    type: CreateStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Student with such ID not found',
  })
  @ApiBadRequestResponse({
    description: "Can't get student, try again later",
  })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Updated student object as response',
    type: CreateStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Student with such ID not found',
  })
  @ApiBadRequestResponse({
    description: "Student wasn't updated, try again later",
  })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted student object as response',
    type: CreateStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Student with such ID not found',
  })
  @ApiBadRequestResponse({
    description: "Student wasn't removed, try again later",
  })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
