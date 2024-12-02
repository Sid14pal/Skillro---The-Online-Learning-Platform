import { Component } from '@angular/core';
import { RouteStatusService } from '../../services/route-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public routeStatusService: RouteStatusService){
    this.routeStatusService.hideHeader = true;
  }

}
