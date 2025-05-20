import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-blog',
  templateUrl: './latest-blog.component.html',
  styleUrl: './latest-blog.component.css'
})
export class LatestBlogComponent {

  blogs = [
      {
        id: 1,
        title: '5 Productivity Hacks for Professionals',
        image: 'assets/templates/blog-2-1.jpg',
        date: 'May 1, 2025'
      },
      {
        id: 2,
        title: 'The Future of AI in Everyday Life',
        image: 'assets/templates/blog-2-2.jpg',
        date: 'May 4, 2025'
      },
      {
        id: 3,
        title: 'How to Build a Personal Brand',
        image: 'assets/templates/blog-2-3.jpg',
        date: 'May 13, 2025'
      },
      {
        id: 4,
        title: 'Beginner’s Guide to Investing',
        image: 'assets/templates/blog-2-4.jpg',
        date: 'May 16, 2025'
      },
      {
        id: 5,
        title: 'Why Remote Work Is Here to Stay',
        image: 'assets/templates/blog-2-5.jpg',
        date: 'May 18, 2025'
      },
      {
        id: 6,
        title: 'Mastering Time Management',
        image: 'assets/templates/blog-2-6.jpg',
        date: 'May 20, 2025'
      }
    ];
  
    constructor(private router: Router) {}
  
  
    viewBlogs(blog: any) {
      this.router.navigate(['/blog-details'], { state: { blog } });
    }

}
