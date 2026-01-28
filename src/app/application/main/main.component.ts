import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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

  constructor(public router: Router){
    // Code to retain the selected index from progress bar if page is refresh.
    let alreadySelectedIndex = sessionStorage.getItem('selectedIndex');
    if(alreadySelectedIndex){
      this.activeIndex = +alreadySelectedIndex;
    }
  }

  onActiveIndexChange(stepIndex: number) {
    this.activeIndex = stepIndex;
    sessionStorage.setItem('selectedIndex', stepIndex.toString());
  }

  nextButonClicked(){
    this.activeIndex++;
    sessionStorage.setItem('selectedIndex', (this.activeIndex).toString());
  }

  previousClicked(){
    this.activeIndex--;
    sessionStorage.setItem('selectedIndex', (this.activeIndex).toString());
  }
}
