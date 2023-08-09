import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { StudentsService } from 'src/app/Services/students.service';
import { Student } from 'src/models/students.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [ModalComponent, CommonModule],
})
export class StudentsComponent implements OnInit {
  students: Student[] | undefined;
  student: Student | undefined;
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;
  constructor(private studentsService: StudentsService) {}
  ngOnInit(): void {
    this.getAllStudents();
  }
  openModal(student: any) {
    if (this.modal) {
      this.modal.open(this.modal.content);
      this.modal.editFlag = true;
      this.student = student;
    }
  }
  notify(event: any) {
    this.getAllStudents();
  }
  getAllStudents() {
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
}
