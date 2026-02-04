import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { required_forms_name } from 'src/app/constants/required-forms-name-constant';

@Component({
  selector: 'app-summary-details-form',
  templateUrl: './summary-details-form.component.html',
  styleUrls: ['./summary-details-form.component.scss']
})
export class SummaryDetailsFormComponent implements OnInit {
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();
  errorForms: string[] = [];

  summaryForm = new FormGroup({
    summary: new FormControl('', [Validators.required])
  });

  constructor(public formDataService: FormDataService) {

  }

  ngOnInit() {
    let keys = Object.keys(this.formDataService?.summaryFormData);

    if (keys?.length) {
      this.summaryForm.patchValue({
        summary: this.formDataService?.summaryFormData?.summary
      });
    }

    this.summaryForm.statusChanges.subscribe((status: any) => {
      // needed, to check is all form is valid or not beform review and download step, so setting up all forms as invalid by default.
      if (sessionStorage.getItem(required_forms_name[3]) == null) {
        required_forms_name.forEach((formName: any) => {
          sessionStorage.setItem(formName, 'invalid');
        })
      }

      if (status == 'INVALID') {
        sessionStorage.setItem(required_forms_name[3], 'invalid');
      } else if (status == 'VALID') {
        sessionStorage.setItem(required_forms_name[3], 'valid');
      }

      this.formDataService.summaryFormData = this.summaryForm.value;
    });
  }

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.summaryForm.markAllAsTouched();

    if (this.summaryForm.invalid) {
      return;
    }
    sessionStorage.setItem(required_forms_name[3], 'valid')  //marking form valid on clicking next button.
    this.formDataService.summaryFormData = this.summaryForm.value;

    // Checking is every mandatory form is valid or not
    for (const formName of required_forms_name) {
      if (sessionStorage.getItem(formName) === 'invalid') {
        this.errorForms.push(formName);
      }
    }

    if (this.errorForms.length) {
      return;
    }

    this.nextButonClicked.emit();
  }
}
