import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [ModalComponent],
})
export class StudentsComponent {}
