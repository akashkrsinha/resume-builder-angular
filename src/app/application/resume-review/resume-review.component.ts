import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-resume-review',
  templateUrl: './resume-review.component.html',
  styleUrls: ['./resume-review.component.scss']
})
export class ResumeReviewComponent {
  skills: any = [];
  skillSet1: any = [];
  skillSet2: any = [];
  skillSet3: any = [];
  workExpKeys: any = [];
  projectsKeys: any = [];
  educationKeys: any = [];
  @ViewChild('downloadSection') downloadSection!: ElementRef;
  @Output() previousClicked = new EventEmitter();

  constructor(public formDataService: FormDataService) {
    this.initialiseData();
  }

  initialiseData() {
    this.skills = this.formDataService?.skillFormData?.skills?.split(',');

    this.skills?.map((skill: any, index: number) => {
      if (index < 5) {
        this.skillSet1.push(skill);
      } else if (index < 10) {
        this.skillSet2.push(skill);
      } else if (index < 15) {
        this.skillSet3.push(skill);
      }
    });

    this.workExpKeys = Object.keys(this.formDataService?.workExperienceFormData);
    this.projectsKeys = Object.keys(this.formDataService?.projectFormData);
    this.educationKeys = Object.keys(this.formDataService?.educationFormData);
  }

  download() {
    const element = this.downloadSection.nativeElement;
    element.setAttribute('style', 'width: 100%; max-width: 100%;');

    const opt = {
      margin: 0.2,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  previous() {
    this.previousClicked.emit();
  }

}
