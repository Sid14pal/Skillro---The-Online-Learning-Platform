import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardBannerComponent } from './student-dashboard-banner.component';

describe('StudentDashboardBannerComponent', () => {
  let component: StudentDashboardBannerComponent;
  let fixture: ComponentFixture<StudentDashboardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDashboardBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDashboardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
