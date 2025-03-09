import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditCourseComponent } from './adit-course.component';

describe('AditCourseComponent', () => {
  let component: AditCourseComponent;
  let fixture: ComponentFixture<AditCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AditCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
