import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationDetailsFormComponent } from './certification-details-form.component';

describe('CertificationDetailsFormComponent', () => {
  let component: CertificationDetailsFormComponent;
  let fixture: ComponentFixture<CertificationDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationDetailsFormComponent]
    });
    fixture = TestBed.createComponent(CertificationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
