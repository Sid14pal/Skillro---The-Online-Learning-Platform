import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import {  Student } from '../datatype';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  storage: any;

  constructor(private afs: AngularFirestore, private fireStorage: AngularFireStorage) { }

  // Add student
  addStudent(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  // Get all students
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  // Delete student
  deleteStudent(student: Student) {
    this.afs.doc('/Students/' + student.id).delete();
  }

  // Get student by ID
  getStudentById(studentId: string) {
    return this.afs.doc<Student>(`/Students/${studentId}`).valueChanges();
  }

  // Update student
  updateStudent(studentId: string, student: Student) {
    return this.afs.doc(`/Students/${studentId}`).update(student);
  }

  // Upload image
  async uploadImage(file: File, path: string): Promise<string> {
    const fileRef = this.fireStorage.ref(path);
    await this.fireStorage.upload(path, file);
    return fileRef.getDownloadURL().toPromise();
  }

  uploadVideo(file: File, filePath: string): AngularFireUploadTask {
    return this.fireStorage.upload(filePath, file);  // ✅ fixed here
  }

  getDownloadUrl(filePath: string): Observable<string> {
    return this.fireStorage.ref(filePath).getDownloadURL();  // ✅ fixed here
  }
}