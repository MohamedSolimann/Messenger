import { Component, OnInit } from '@angular/core';
import { SignUpBackendCallsSerivce } from './service/backendCalls.service';
import { NavigationService } from './service/navigation.service';
import { res } from '../data.models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(
    public signUpBackendCalls: SignUpBackendCallsSerivce,
    public myNavigation: NavigationService
  ) {}
  public username = 'mohamed';
  public password = 'mohamedd';
  public mobile: number = 12312312312;

  handleSignUp() {
    const { username, password, mobile } = this;
    debugger;
    let data = { username, password, mobile };
    this.signUpBackendCalls.SignUp(data).subscribe((response: res) => {
      if (response.message === 'Success') {
        this.myNavigation.navigateTo('/signin');
      }
    });
  }
}
