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
import { CommonModule } from '@angular/common';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [
    ModalComponent,
    CommonModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    FormsModule,
    DeleteModalComponent,
  ],
})
export class StudentsComponent implements OnInit, OnChanges {
  students: Student[] | undefined;
  student: Student | undefined;
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  paginatedStudents: Student[] | undefined;
  searchText: string = '';
  filteredData: Student[] | undefined;
  constructor(private studentsService: StudentsService) {}
  ngOnInit(): void {
    this.getAllStudents();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filterTable();
  }
  openModal(student: any) {
    if (this.modal) {
      this.modal.open(this.modal.content);
      this.modal.editFlag = true;
      this.student = student;
    }
  }
  notify(event: any) {
    if (this.modal) {
      this.modal.date = {
        year: 0,
        month: 0,
        day: 0,
      };
    }
    this.getAllStudents();
  }
  getAllStudents() {
    this.studentsService.GetAllStudents().subscribe({
      next: (data: any) => {
        this.students = data;
        if (this.students) {
          this.collectionSize = this.students.length;
        }
        this.refreshStudents();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Students fetched');
      },
    });
  }
  deleteStudent(id: string, event: any) {
    this.studentsService.RemoveStudent(id).subscribe(() => {
      this.getAllStudents();
    });
  }
  getAge(bdate: any) {
    const dateNow = new Date().getTime();
    const birthday = new Date(bdate).getTime();
    const diff = dateNow - birthday;
    const age = Math.floor(diff / 31556952000);
    return age;
  }
  refreshStudents() {
    this.paginatedStudents = this.students
      ?.map((student: any, i: any) => ({ id: i + 1, ...student }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    this.filteredData = this.paginatedStudents;
  }
  filterTable() {
    if (this.paginatedStudents) {
      if (!this.searchText) {
        this.filteredData = [...this.paginatedStudents];
        return;
      }
      this.filteredData = this.paginatedStudents.filter(
        (data) =>
          data.fname.toLowerCase().includes(this.searchText.toLowerCase()) ||
          data.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
          data.lname.toLowerCase().includes(this.searchText.toLowerCase()) ||
          data.country.toLowerCase().includes(this.searchText.toLowerCase()) ||
          data.gender.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
