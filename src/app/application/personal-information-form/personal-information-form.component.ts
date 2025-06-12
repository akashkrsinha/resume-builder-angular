import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss']
})
export class PersonalInformationFormComponent {
  uploadedImageURL: any;
  personalInfoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]),
    address: new FormControl(''),
    linkedURL: new FormControl(''),
    gitHubURL: new FormControl(''),
  });

  @Output() nextButonClicked = new EventEmitter();

  constructor(public formDataService: FormDataService){}

  uploadImage(event: any) {    
    let uploadedImage = event.target.files[0];
    if (uploadedImage)
      this.uploadedImageURL = URL.createObjectURL(uploadedImage);
  }

  submitAndNext(){
    this.personalInfoForm.markAllAsTouched();    

    this.formDataService.personalInfoFormData = { ...this.personalInfoForm.value, imageURL: this.uploadedImageURL };

    this.nextButonClicked.emit();
  }
}
