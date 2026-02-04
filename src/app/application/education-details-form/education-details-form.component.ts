import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { required_forms_name } from 'src/app/constants/required-forms-name-constant';

@Component({
  selector: 'app-education-details-form',
  templateUrl: './education-details-form.component.html',
  styleUrls: ['./education-details-form.component.scss']
})
export class EducationDetailsFormComponent implements OnInit {
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

  constructor(public formDataService: FormDataService) {
  }

  ngOnInit() {
    let keys = Object.keys(this.formDataService?.educationFormData);

    if (keys.length) {
      keys.map((subFormName: string) => {
        this.educationForm.get(subFormName)?.patchValue({
          instituteName: this.formDataService?.educationFormData?.[subFormName]?.instituteName,
          startDate: this.formDataService?.educationFormData?.[subFormName]?.startDate,
          endDate: this.formDataService?.educationFormData?.[subFormName]?.endDate,
          marks: this.formDataService?.educationFormData?.[subFormName]?.marks,
        });
      });
    }

    this.educationForm.statusChanges.subscribe((status: any) => {
      // needed, to check is all form is valid or not beform review and download step, so setting up all forms as invalid by default.
      if (sessionStorage.getItem(required_forms_name[1]) == null) {
        required_forms_name.forEach((formName: any) => {
          sessionStorage.setItem(formName, 'invalid');
        })
      }

      if (status == 'INVALID') {
        sessionStorage.setItem(required_forms_name[1], 'invalid');
      } else if (status == 'VALID') {
        sessionStorage.setItem(required_forms_name[1], 'valid');
      }

      this.formDataService.educationFormData = this.educationForm.value;
    });
  }


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

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.educationForm.markAllAsTouched();

    if (this.educationForm.invalid) {
      return;
    }
    sessionStorage.setItem(required_forms_name[1], 'valid')  //marking form valid on clicking next button.
    this.formDataService.educationFormData = this.educationForm.value;
    this.nextButonClicked.emit();
  }
}
