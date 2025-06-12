import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-education-details-form',
  templateUrl: './education-details-form.component.html',
  styleUrls: ['./education-details-form.component.scss']
})
export class EducationDetailsFormComponent {
  today: any = new Date().toISOString().split('T')[0];
  tenthFormEndDateError: boolean = false;
  twelveFormEndDateError: boolean = false;
  graduationFormEndDateError: boolean = false;
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();

  educationForm = new FormGroup({

    graduationForm: new FormGroup({
      instituteName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\s]*$')]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl({ value: '', disabled: true }),
      marks: new FormControl('')
    }),

    twelveForm: new FormGroup({
      instituteName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\s]*$')]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl({ value: '', disabled: true }),
      marks: new FormControl('')
    }),

    tenthForm: new FormGroup({
      instituteName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z\\s]*$')]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl({ value: '', disabled: true }),
      marks: new FormControl('')
    }),
  });

  constructor(public formDataService: FormDataService) { }

  startDateChanges(formGroupName: string) {
    if (this.educationForm.get(`${formGroupName}.startDate`)?.value) {
      this.educationForm.get(`${formGroupName}.endDate`)?.enable();
      this.educationForm.get(`${formGroupName}.endDate`)?.setValidators([Validators.required]);
      this.educationForm.get(`${formGroupName}.endDate`)?.updateValueAndValidity();
    }    
  }

  endDateChanges(formGroupName: string) {
    let endDate = this.educationForm.get(`${formGroupName}.endDate`)?.value;
    let startDate = this.educationForm.get(`${formGroupName}.startDate`)?.value;

    if (formGroupName == 'tenthForm' && endDate && startDate) {
      if (endDate < startDate) {
        this.tenthFormEndDateError = true;
      } else {
        this.tenthFormEndDateError = false;
      }
    } else if (formGroupName == 'twelveForm' && endDate && startDate) {
      if (endDate < startDate) {
        this.twelveFormEndDateError = true;
      } else {
        this.twelveFormEndDateError = false;
      }
    } if (formGroupName == 'graduationForm' && endDate && startDate) {
      if (endDate < startDate) {
        this.graduationFormEndDateError = true;
      } else {
        this.graduationFormEndDateError = false;
      }
    }
  }

  previous(){
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.educationForm.markAllAsTouched();
    this.formDataService.educationFormData = this.educationForm.value;
    this.nextButonClicked.emit();
  }
}
