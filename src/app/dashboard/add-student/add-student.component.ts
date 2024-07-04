import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  constructor(private routeStatusService: RouteStatusService){
    this.routeStatusService.hideHeader = true;
  }

}
