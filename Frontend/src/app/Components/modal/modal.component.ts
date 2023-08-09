import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentsService } from 'src/app/Services/students.service';
import { Student } from 'src/models/students.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges {
  countries = ['Egypt', 'KSA', 'UAE', 'USA', 'Italy'];
  date = {
    year: 0,
    month: 0,
    day: 0,
  };
  @Input('student') student: any;
  @ViewChild('content') content: any;
  editFlag: boolean = false;
  @Output() event= new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private studentsService: StudentsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.student) {
      const newDate = new Date(this.student.birthdate);
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      const day = newDate.getDate();
      this.date.day = day;
      this.date.month = month;
      this.date.year = year;
    }
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (form: NgForm) => {
          const bdate = `${this.date.year}-${this.date.month}-${this.date.day}`;
          const newStudent = {
            fname: form.controls['fname'].value,
            lname: form.controls['lname'].value,
            email: form.controls['email'].value,
            country: form.controls['country'].value,
            gender: form.controls['gender'].value,
            birthdate: Date.parse(bdate),
          };
          if (form.valid) {
            if (this.editFlag) {
              this.studentsService
                .UpdateStudentByID(this.student._id, newStudent)
                .subscribe();
            } else {
              console.log('here at add');
              this.studentsService.AddNewStudent(newStudent).subscribe();
            }
            this.event.emit('update');
          }
        },
        (reason) => {
          console.log(reason);
          this.editFlag = false;
        }
      );
  }
}
