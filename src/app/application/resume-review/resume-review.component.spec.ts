import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeReviewComponent } from './resume-review.component';

describe('ResumeReviewComponent', () => {
  let component: ResumeReviewComponent;
  let fixture: ComponentFixture<ResumeReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeReviewComponent]
    });
    fixture = TestBed.createComponent(ResumeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
