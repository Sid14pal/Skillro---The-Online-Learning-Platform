import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChooseAreaComponent } from './student-choose-area.component';

describe('StudentChooseAreaComponent', () => {
  let component: StudentChooseAreaComponent;
  let fixture: ComponentFixture<StudentChooseAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentChooseAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentChooseAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
