import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { StudentsService } from 'src/app/Services/students.service';
import { Student } from 'src/models/students.model';
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
  dateNow = new Date().getTime();
  test: any;
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
  deleteStudent(id: string) {
    this.studentsService.RemoveStudent(id).subscribe();
    this.getAllStudents();
  }
  getAge(bdate: any) {
    const birthday = new Date(bdate).getTime();
    const diff = this.dateNow - birthday;
    const age = Math.floor(diff / 31556952000);
    return age;
  }
}
