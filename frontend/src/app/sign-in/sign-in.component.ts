import { Component, OnInit } from '@angular/core';
import { SignInBackendCallsSerivce } from './service/backendCalls.service';
import { res } from '../data.models';
import { NavigationService } from '../sign-up/service/navigation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    public myBackend: SignInBackendCallsSerivce,
    public myNavigation: NavigationService
  ) {}

  ngOnInit(): void {}
  public mobile = 12312312312;
  public password = 'mohamedd';

  handleSignIn() {
    const { mobile, password } = this;
    let data = { mobile, password };
    this.myBackend.SignIn(data).subscribe((response: res) => {
      debugger;
      if (response.message === 'Success') {
        this.myNavigation.navigateToWithData('/main', response.userId);
      }
    });
  }
}
