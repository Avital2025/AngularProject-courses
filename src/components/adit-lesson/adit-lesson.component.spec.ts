import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditLessonComponent } from './adit-lesson.component';

describe('AditLessonComponent', () => {
  let component: AditLessonComponent;
  let fixture: ComponentFixture<AditLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AditLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AditLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
