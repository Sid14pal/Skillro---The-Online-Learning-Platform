import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent {

  constructor(private routeStatusService: RouteStatusService){
    this.routeStatusService.hideHeader = true;
  }

}
