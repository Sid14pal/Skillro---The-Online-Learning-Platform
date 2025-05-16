import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../datatype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';

  constructor(private studentService: StudentService, private router: Router,) {}

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((res: any) => {
      this.students = res.map((doc: any) => ({
        id: doc.payload.doc.id,
        ...doc.payload.doc.data()
      }));
      this.filteredStudents = [...this.students];
    });
  }

  filterStudents() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(term)
    );
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.filterStudents();
  }

   viewDetails(student: any) {
        this.router.navigate(['/course-details'], 
        {
          queryParams: {
            image: student.imageUrl,
            name: student.name,
            price: student.class,
            lesson: student.roll,
            category: student.email
          }
        });
      }
}
