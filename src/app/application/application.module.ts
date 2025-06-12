import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MainComponent } from './main/main.component';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { PersonalInformationFormComponent } from './personal-information-form/personal-information-form.component';
import { EducationDetailsFormComponent } from './education-details-form/education-details-form.component';
import { WorkExperienceFormComponent } from './work-experience-form/work-experience-form.component';
import { SkillDetailsFormComponent } from './skill-details-form/skill-details-form.component';
import { ProjectDetailsFormComponent } from './project-details-form/project-details-form.component';
import { CertificationDetailsFormComponent } from './certification-details-form/certification-details-form.component';
import { AchievementFormComponent } from './achievement-form/achievement-form.component';
import { SummaryDetailsFormComponent } from './summary-details-form/summary-details-form.component';
import { ResumeReviewComponent } from './resume-review/resume-review.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    PersonalInformationFormComponent,
    EducationDetailsFormComponent,
    WorkExperienceFormComponent,
    SkillDetailsFormComponent,
    ProjectDetailsFormComponent,
    CertificationDetailsFormComponent,
    AchievementFormComponent,
    SummaryDetailsFormComponent,
    ResumeReviewComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    StepsModule,
    ToastModule,
    ReactiveFormsModule
  ],
})
export class ApplicationModule { }
