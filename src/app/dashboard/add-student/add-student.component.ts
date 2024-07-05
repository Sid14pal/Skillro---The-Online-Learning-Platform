import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  constructor(private routeStatusService: RouteStatusService, private fb: FormBuilder, private studentService: StudentService){
    this.routeStatusService.hideHeader = true;
  }

}
