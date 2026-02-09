import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

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
  isDownloading = false;
  @ViewChild('downloadSection') downloadSection!: ElementRef;
  @Output() previousClicked = new EventEmitter();

  constructor(public formDataService: FormDataService, private ChangeDetectorRef: ChangeDetectorRef) {
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
    this.isDownloading = true;

    const element = this.downloadSection.nativeElement;
    element.style.width = '794px';       // A4 width
    element.style.height = '1080px';      // A4 height
    element.style.boxSizing = 'border-box';


    const opt = {
      margin: 0.2,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      this.isDownloading = false;
      element.style.height = 'auto'; //Reseting height
      element.style.display = 'block';
      this.ChangeDetectorRef.detectChanges(); 

      Swal.fire({
        toast: true,
        icon: 'success',
        text: 'Download successful',
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    }).catch(() => {
      this.isDownloading = false;
      this.ChangeDetectorRef.detectChanges(); 

      Swal.fire({
        toast: true,
        icon: 'error',
        text: 'Download Unsuccessful',
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    });
  }

  previous() {
    this.previousClicked.emit();
  }

}
