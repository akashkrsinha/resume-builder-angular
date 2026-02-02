import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

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

  constructor(public formDataService: FormDataService) {}
  
  ngOnInit() {
    let keys = Object.keys(this.formDataService?.skillFormData);
  
    if (keys?.length) {
      this.skillsForm.patchValue({
        skills: this.formDataService?.skillFormData?.skills
      });
    }

    this.skillsForm.statusChanges.subscribe((status: any) => {
      if (status == 'INVALID') {
        sessionStorage.setItem('Skills Form', 'invalid');
      } else if (status == 'VALID') {
        sessionStorage.setItem('Skills Form', 'valid');
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
    sessionStorage.setItem('Skills Form', 'valid')  //marking form valid on clicking next button.
    this.formDataService.skillFormData = this.skillsForm.value;
    this.nextButonClicked.emit();
  }
}
