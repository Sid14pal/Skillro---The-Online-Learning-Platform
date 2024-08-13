import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {

  user: any = {};
  userInitials: string | undefined;

  constructor(private auth:AuthService, private routeStatusService: RouteStatusService,){
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.userInitials = this.getInitials(user);
        console.log('User data:', this.user);
      }
    });
  }


  getInitials(user: any): string {
    if (user.displayName) {
      const names = user.displayName.split(' ');
      const initials = names.map((name: string) => name.charAt(0)).join('');
      return initials.toUpperCase();
    } else if (user.email) {
      const emailParts = user.email.split('@')[0].split('.');
      const initials = emailParts.map((part: string) => part.charAt(0)).join('');
      return initials.toUpperCase();
    }
    return '';
  }

  signOut(){
    this.auth.logout();
  }

}
