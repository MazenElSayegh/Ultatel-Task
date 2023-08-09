import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentsService } from 'src/app/Services/students.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  countries = ['Egypt', 'KSA', 'UAE', 'USA', 'Italy'];
  date = {
    year: '',
    month: '',
    day: '',
  };
  constructor(
    private modalService: NgbModal,
    private studentsService: StudentsService
  ) {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (form: NgForm) => {
          const bdate=`${this.date.year}-${this.date.month}-${this.date.day}`;
          const newStudent = {
            fname: form.controls['fname'].value,
            lname: form.controls['lname'].value,
            email: form.controls['email'].value,
            country: form.controls['country'].value,
            gender: form.controls['gender'].value,
            birthdate: Date.parse(bdate),
          };
          if (form.valid) {
            console.log("here");
            this.studentsService.AddNewStudent(newStudent).subscribe();
          }
        },
        (reason) => {
          console.log(reason);
        }
      );
  }
  onSubmit(ref: NgForm) {
    console.log(ref.value);
    console.log(ref.valid);
    console.log(ref.controls['fname'].value);
  }
}
