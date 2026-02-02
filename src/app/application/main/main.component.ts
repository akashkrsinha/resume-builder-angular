import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  requiredFormName: string[] = [];


  activeIndex = 0;

  constructor(public router: Router) {
    this.requiredFormName = ['Personal Information Form', 'Education Form', 'Skills Form', 'Summary Form'];

    //needed to check is all form is valid or not beform review and download step, so setting up all forms as invalid by default.
    this.requiredFormName.forEach((formName: any) => {
      sessionStorage.setItem(formName, 'invalid');
    })
  }

  ngOnInit() {
    // Code to retain the selected index from progress bar if page is refresh.
    let alreadySelectedIndex = sessionStorage.getItem('selectedIndex');
    if (alreadySelectedIndex) {
      this.activeIndex = +alreadySelectedIndex;
    }
  }

  onActiveIndexChange(stepIndex: number) {
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
