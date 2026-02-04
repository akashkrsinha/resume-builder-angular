import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { required_forms_name } from 'src/app/constants/required-forms-name-constant';

@Component({
  selector: 'app-skill-details-form',
  templateUrl: './skill-details-form.component.html',
  styleUrls: ['./skill-details-form.component.scss']
})
export class SkillDetailsFormComponent implements OnInit {
  skillsForm = new FormGroup({
    skills: new FormControl('', [Validators.required])
  });
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();

  constructor(public formDataService: FormDataService) { }

  ngOnInit() {
    let keys = Object.keys(this.formDataService?.skillFormData);

    if (keys?.length) {
      this.skillsForm.patchValue({
        skills: this.formDataService?.skillFormData?.skills
      });
    }

    this.skillsForm.statusChanges.subscribe((status: any) => {
      // needed, to check is all form is valid or not beform review and download step, so setting up all forms as invalid by default.
      if (sessionStorage.getItem(required_forms_name[2]) == null) {
        required_forms_name.forEach((formName: any) => {
          sessionStorage.setItem(formName, 'invalid');
        })
      }

      if (status == 'INVALID') {
        sessionStorage.setItem(required_forms_name[2], 'invalid');
      } else if (status == 'VALID') {
        sessionStorage.setItem(required_forms_name[2], 'valid');
      }

      this.formDataService.skillFormData = this.skillsForm.value;
    });
  }

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    this.skillsForm.markAllAsTouched();

    if (this.skillsForm.invalid) {
      return;
    }
    sessionStorage.setItem(required_forms_name[2], 'valid')  //marking form valid on clicking next button.
    this.formDataService.skillFormData = this.skillsForm.value;
    this.nextButonClicked.emit();
  }
}
