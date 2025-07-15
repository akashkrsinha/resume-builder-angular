import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-skill-details-form',
  templateUrl: './skill-details-form.component.html',
  styleUrls: ['./skill-details-form.component.scss']
})
export class SkillDetailsFormComponent {
  skillsForm = new FormGroup({
    skills: new FormControl('', [Validators.required])
  });
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();

  constructor(public formDataService: FormDataService) { 
    let keys = Object.keys(this.formDataService?.skillFormData);

    if(keys?.length){
      this.skillsForm.patchValue({
        skills: this.formDataService?.skillFormData?.skills
      });
    }
  }

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.skillsForm.markAllAsTouched();

    if (this.skillsForm.invalid) {
      return;
    }

    this.formDataService.skillFormData = this.skillsForm.value;
    this.nextButonClicked.emit();
  }
}
