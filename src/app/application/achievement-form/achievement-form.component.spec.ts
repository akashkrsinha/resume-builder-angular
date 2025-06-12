import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementFormComponent } from './achievement-form.component';

describe('AchievementFormComponent', () => {
  let component: AchievementFormComponent;
  let fixture: ComponentFixture<AchievementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AchievementFormComponent]
    });
    fixture = TestBed.createComponent(AchievementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
