import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(private modalService: NgbModal) {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: NgForm) => {
          console.log(result.value);
          console.log(result.valid);
          console.log(result.controls['fname'].value);
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
