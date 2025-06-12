import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDetailsFormComponent } from './skill-details-form.component';

describe('SkillDetailsFormComponent', () => {
  let component: SkillDetailsFormComponent;
  let fixture: ComponentFixture<SkillDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDetailsFormComponent]
    });
    fixture = TestBed.createComponent(SkillDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
