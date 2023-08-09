import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private Base_URL = 'http://localhost:3000/students';
  constructor(private myClient: HttpClient) {}
  GetAllStudents() {
    return this.myClient.get(this.Base_URL);
  }
  UpdateStudentByID(id: any, updatedStudent: any) {
    return this.myClient.patch(this.Base_URL + '/' + id, updatedStudent);
  }
  GetStudentByID(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id);
  }
  AddNewStudent(newStudent: any) {
    return this.myClient.post(this.Base_URL, newStudent);
  }
  RemoveStudent(id: any) {
    return this.myClient.delete(this.Base_URL + '/' + id);
  }
}
