import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouteStatusService } from '../../services/route-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard-header',
  templateUrl: './student-dashboard-header.component.html',
  styleUrl: './student-dashboard-header.component.css'
})
export class StudentDashboardHeaderComponent {

  
    constructor(private auth:AuthService, private routeStatusService: RouteStatusService, private router: Router){
      this.routeStatusService.hideHeader = true;
    }
  
    logOut() {
      sessionStorage.removeItem('userDetails');
      this.router.navigate(['/student-login'])
    }

}
