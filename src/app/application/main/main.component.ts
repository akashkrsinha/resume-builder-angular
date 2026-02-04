import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { required_forms_name } from 'src/app/constants/required-forms-name-constant';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items = [
    { label: 'Personal Information' },
    { label: 'Education' },
    { label: 'Work Experience' },
    { label: 'Skills' },
    { label: 'Projects' },
    { label: 'Summary' },
    { label: 'Review' },
  ];

  activeIndex = 0;

  constructor(public router: Router) { }

  ngOnInit() {
    // Code to retain the selected index from progress bar if page is refresh.
    let alreadySelectedIndex = sessionStorage.getItem('selectedIndex');
    if (alreadySelectedIndex) {
      this.activeIndex = +alreadySelectedIndex;
    }
  }

  onActiveIndexChange(stepIndex: number) {
    // needed, to check is all form is valid or not beform review and download step, so setting up all forms as invalid by default.
    if (sessionStorage.getItem(required_forms_name[0]) == null) {
      required_forms_name.forEach((formName: any) => {
        sessionStorage.setItem(formName, 'invalid');
      })
    }

    this.activeIndex = stepIndex;
    sessionStorage.setItem('selectedIndex', stepIndex.toString());
  }

  nextButonClicked() {
    this.activeIndex++;
    sessionStorage.setItem('selectedIndex', (this.activeIndex).toString());
  }

  previousClicked() {
    this.activeIndex--;
    sessionStorage.setItem('selectedIndex', (this.activeIndex).toString());
  }
}
