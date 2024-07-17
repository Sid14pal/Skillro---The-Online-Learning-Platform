import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {

  constructor(private routeStatusService: RouteStatusService){
    this.routeStatusService.hideHeader = true;
  }

}
