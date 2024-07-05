import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css'
})
export class AddStudentsComponent {

  constructor(private routeStatusService: RouteStatusService){
    this.routeStatusService.hideHeader = true;
  }

}
