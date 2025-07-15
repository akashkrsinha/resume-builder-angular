import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;

  constructor(public router: Router){
    this.isUserLoggedIn = sessionStorage.getItem('isUserLoggedin') == 'true' ? true : false;
  }

  loginClicked(){
    this.router.navigateByUrl('auth/login');
  }

  signupClicked(){
    this.router.navigateByUrl('auth/signup');
  }
}
