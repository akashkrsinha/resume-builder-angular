import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  personalInfoFormData: any = {};
  educationFormData: any = {};
  workExperienceFormData: any = {};
  skillFormData: any = {};
  projectFormData: any= {};
  certificationFormData: any = {};
  summaryFormData: any = {};

  constructor() { }
}
