import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { required_forms_name } from 'src/app/constants/required-forms-name-constant';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss']
})
export class PersonalInformationFormComponent implements OnInit {
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

  constructor(public formDataService: FormDataService) { }

  ngOnInit() {
    //Checking if form data already exist
    let keys = Object.keys(this.formDataService?.personalInfoFormData);

    if (keys?.length) {
      this.personalInfoForm.patchValue({
        name: this.formDataService?.personalInfoFormData?.name,
        email: this.formDataService?.personalInfoFormData?.email,
        mobile: this.formDataService?.personalInfoFormData?.mobile,
        address: this.formDataService?.personalInfoFormData?.address,
        linkedURL: this.formDataService?.personalInfoFormData?.linkedURL,
        gitHubURL: this.formDataService?.personalInfoFormData?.gitHubURL,
      });

      this.uploadedImageURL = this.formDataService?.personalInfoFormData?.imageURL;
    }

    this.personalInfoForm.statusChanges.subscribe((status: any) => {
      // needed, to check is all form is valid or not beform review and download step, so setting up all forms as invalid by default.
      if (sessionStorage.getItem(required_forms_name[0]) == null) {
        required_forms_name.forEach((formName: any) => {
          sessionStorage.setItem(formName, 'invalid');
        })
      }

      if (status == 'INVALID') {
        sessionStorage.setItem(required_forms_name[0], 'invalid');
      } else if (status == 'VALID') {
        sessionStorage.setItem(required_forms_name[0], 'valid');
      }

      this.formDataService.personalInfoFormData = { ...this.personalInfoForm.value, imageURL: this.uploadedImageURL };
    });
  }

  uploadImage(event: any) {
    let uploadedImage = event.target.files[0];
    if (uploadedImage)
      this.uploadedImageURL = URL.createObjectURL(uploadedImage);
  }

  submitAndNext() {
    this.personalInfoForm.markAllAsTouched();

    if (this.personalInfoForm.invalid) {
      return;
    }
    sessionStorage.setItem(required_forms_name[0], 'valid')  //marking form valid on clicking next button.
    this.formDataService.personalInfoFormData = { ...this.personalInfoForm.value, imageURL: this.uploadedImageURL };

    this.nextButonClicked.emit();
  }
}
