import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {

    blog: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.blog = navigation?.extras.state?.['blog'];
    console.log(this.blog);
  }

}
