import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-project-details-form',
  templateUrl: './project-details-form.component.html',
  styleUrls: ['./project-details-form.component.scss']
})
export class ProjectDetailsFormComponent {
  numberOfProjects: any = [];
  @Output() nextButonClicked = new EventEmitter();
  @Output() previousClicked = new EventEmitter();

  projectForm = new FormGroup({});

  constructor(public formDataService: FormDataService) { 
    let keys = Object.keys(this.formDataService?.projectFormData);

    if (keys?.length) {
      keys.map((subFormName: any) => {
        this.createDynamicForm();
        
        this.projectForm.get(subFormName)?.patchValue({
          projectName: this.formDataService.projectFormData?.[subFormName]['projectName'],
          projectDescription: this.formDataService.projectFormData?.[subFormName]['projectDescription'],
        });
      });
    }
  }

  createDynamicForm() {
    let newNumberToAdd = 0;

    if (this.numberOfProjects.length == 0) {
      newNumberToAdd = 1;
    } else {
      newNumberToAdd = this.numberOfProjects.length + 1;
    }
    this.numberOfProjects.push(newNumberToAdd);

    const experienceGroup = new FormGroup({
      projectName: new FormControl(''),
      projectDescription: new FormControl(''),
    })

    this.projectForm.addControl('project' + newNumberToAdd, experienceGroup);
  }

  previous() {
    this.previousClicked.emit();
  }

  submitAndNext() {
    console.log(this.projectForm);
    this.formDataService.projectFormData = this.projectForm.value;
    this.nextButonClicked.emit();
  }

}
