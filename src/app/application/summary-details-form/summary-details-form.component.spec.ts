import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDetailsFormComponent } from './summary-details-form.component';

describe('SummaryDetailsFormComponent', () => {
  let component: SummaryDetailsFormComponent;
  let fixture: ComponentFixture<SummaryDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryDetailsFormComponent]
    });
    fixture = TestBed.createComponent(SummaryDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
