import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.scss']
})
export class WorkExperienceFormComponent implements OnInit {
  numberOfExperience: any = [];

  workExperienceForm = new FormGroup({});
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();

  constructor(public formDataService: FormDataService) {}
  
  ngOnInit() {
    let keys = Object.keys(this.formDataService?.workExperienceFormData);
  
    if (keys?.length) {
      keys.map((subFormName: any) => {
        this.createDynamicForm();
  
        this.workExperienceForm.get(subFormName)?.patchValue({
          companyName: this.formDataService.workExperienceFormData?.[subFormName]['companyName'],
          designation: this.formDataService.workExperienceFormData?.[subFormName]['designation'],
          duration: this.formDataService.workExperienceFormData?.[subFormName]['duration']
        });
      });
    }
    
    this.workExperienceForm.statusChanges.subscribe((status: any) => {
      this.formDataService.workExperienceFormData = this.workExperienceForm.value;
    });
  }

  createDynamicForm() {
    let newNumberToAdd = 0;

    if (this.numberOfExperience.length == 0) {
      newNumberToAdd = 1;
    } else {
      newNumberToAdd = this.numberOfExperience.length + 1;
    }
    this.numberOfExperience.push(newNumberToAdd);

    const experienceGroup = new FormGroup({
      companyName: new FormControl(''),
      designation: new FormControl(''),
      duration: new FormControl('')
    })

    this.workExperienceForm.addControl('workExperience' + newNumberToAdd, experienceGroup);
  }

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.formDataService.workExperienceFormData = this.workExperienceForm.value;

    this.nextButonClicked.emit();
  }
}
