import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { StudentsService } from 'src/app/Services/students.service';
import { Student } from 'src/models/students.model';

@Component({
  // standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  // imports: [ModalComponent],
})
export class StudentsComponent implements OnInit {
  students: Student[] | undefined;
  constructor(private studentsService: StudentsService) {
    this.studentsService.GetAllStudents().subscribe({
      next: (data: any) => {
        this.students = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Students fetched');
      },
    });
  }
  ngOnInit(): void {

  }
}
