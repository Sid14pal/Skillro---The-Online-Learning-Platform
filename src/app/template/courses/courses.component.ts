import { Component, NgZone, EventEmitter, Output } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../datatype';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  
    selectedView: 'grid' | 'list' = 'grid';

  @Output() viewChanged = new EventEmitter<'grid' | 'list'>();

  setView(view: 'grid' | 'list') {
    this.selectedView = view;
    this.viewChanged.emit(view);
  }

  pageTitle = 'All Courses';

   studentsList: Student[] = [];
              studentObj: Student = {
                id: '',
                name: '',
                category: '',
                duration: '',
                price: '',
                videoUrl: ''
              };
        
              user: any = {};
              userInitials: string | undefined;
        constructor(private ngZone: NgZone,  private data: StudentService, private router: Router, private auth:AuthService,) {
        }
    
        ngOnInit(): void {
          this.getAllStudents();
        }
      
        getAllStudents() {
          this.data.getAllStudents().subscribe(res => {
            this.studentsList = res.map((e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            });
          }, err => {
            alert('Error while fetching student data');
          });
        }
    
        viewDetails(student: any) {
          this.router.navigate(['/course-details'], 
          {
            queryParams: {
              image: student.imageUrl,
              name: student.name,
              price: student.price,
              lesson: student.duration,
              category: student.category,
              contents: JSON.stringify(student.courseContents),
              video: student.videoUrl
            }
          });
        }

}
