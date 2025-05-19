import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyOurStudentsComponent } from './why-our-students.component';

describe('WhyOurStudentsComponent', () => {
  let component: WhyOurStudentsComponent;
  let fixture: ComponentFixture<WhyOurStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyOurStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyOurStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
