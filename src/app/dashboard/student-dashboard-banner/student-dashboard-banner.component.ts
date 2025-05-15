import { isPlatformBrowser } from '@angular/common';
import { Component } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-student-dashboard-banner',
  templateUrl: './student-dashboard-banner.component.html',
  styleUrl: './student-dashboard-banner.component.css'
})
export class StudentDashboardBannerComponent {

   getData: any;

   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void  {
    if (isPlatformBrowser(this.platformId)) {
    const data = sessionStorage.getItem('userDetails');
    this.getData = data?.split('@')[0];
    this.getData = this.getData.charAt(0).toUpperCase() + this.getData.slice(1).toLowerCase();
    }
  }

}
