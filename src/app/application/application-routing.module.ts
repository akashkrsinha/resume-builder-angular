import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PersonalInformationFormComponent } from './personal-information-form/personal-information-form.component';
import { EducationDetailsFormComponent } from './education-details-form/education-details-form.component';
import { WorkExperienceFormComponent } from './work-experience-form/work-experience-form.component';
import { SkillDetailsFormComponent } from './skill-details-form/skill-details-form.component';
import { ProjectDetailsFormComponent } from './project-details-form/project-details-form.component';
import { CertificationDetailsFormComponent } from './certification-details-form/certification-details-form.component';
import { SummaryDetailsFormComponent } from './summary-details-form/summary-details-form.component';
import { ResumeReviewComponent } from './resume-review/resume-review.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'personal-information', component: PersonalInformationFormComponent },
  { path: 'education-details', component: EducationDetailsFormComponent },
  { path: 'work-experience', component: WorkExperienceFormComponent },
  { path: 'skills', component: SkillDetailsFormComponent },
  { path: 'projects', component: ProjectDetailsFormComponent },
  { path: 'certifications', component: CertificationDetailsFormComponent },
  { path: 'summary', component: SummaryDetailsFormComponent },
  { path: 'resume-review', component: ResumeReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
