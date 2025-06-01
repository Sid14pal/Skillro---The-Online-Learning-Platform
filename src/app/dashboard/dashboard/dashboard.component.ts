import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouteStatusService } from '../../services/route-status.service';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{

  user: any;
  userInitials: string | undefined;
  allowedEmails: string[] = ['siddharthapaul440@gmail.com' , 'siddhartha.paul@codeclouds.in'];
  hasAccess = false;

  constructor(private auth:AuthService, private routeStatusService: RouteStatusService, private data: StudentService){
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.userInitials = this.getInitials(user);
        this.hasAccess = this.allowedEmails.includes(user.email ?? '');
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
