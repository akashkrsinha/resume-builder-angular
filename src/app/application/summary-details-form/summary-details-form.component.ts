import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-summary-details-form',
  templateUrl: './summary-details-form.component.html',
  styleUrls: ['./summary-details-form.component.scss']
})
export class SummaryDetailsFormComponent {
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();

  summaryForm = new FormGroup({
    summary: new FormControl('', [Validators.required])
  });

  constructor(public formDataService: FormDataService) {
     let keys = Object.keys(this.formDataService?.summaryFormData);

    if(keys?.length){
      this.summaryForm.patchValue({
        summary: this.formDataService?.summaryFormData?.summary
      });
    }
   }

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.summaryForm.markAllAsTouched();

    if (this.summaryForm.invalid) {
      return;
    }

    this.formDataService.summaryFormData = this.summaryForm.value;

    this.nextButonClicked.emit();
  }
}
