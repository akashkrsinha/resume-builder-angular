import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-summary-details-form',
  templateUrl: './summary-details-form.component.html',
  styleUrls: ['./summary-details-form.component.scss']
})
export class SummaryDetailsFormComponent implements OnInit {
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();
  @Input() requiredFormName!: string[];
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
      if (status == 'INVALID') {
        sessionStorage.setItem('Summary Form', 'invalid');
      } else if (status == 'VALID') {
        sessionStorage.setItem('Summary Form', 'valid');
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
    sessionStorage.setItem('Summary Form', 'valid')  //marking form valid on clicking next button.
    this.formDataService.summaryFormData = this.summaryForm.value;

    // Checking is every mandatory form is valid or not
    for (const formName of this.requiredFormName) {
      if (sessionStorage.getItem(formName) === 'invalid') {
        console.log(formName, 'invlid formName');
        this.errorForms.push(formName);
      }
    }

    if (this.errorForms.length) {
      return;
    }
    
    this.nextButonClicked.emit();
  }
}
