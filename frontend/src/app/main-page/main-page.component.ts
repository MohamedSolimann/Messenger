import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { res } from '../data.models';
import { SignInBackendCallsSerivce } from '../sign-in/service/backendCalls.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(
    public myAcitvatedRouter: ActivatedRoute,
    public BDCalls: SignInBackendCallsSerivce
  ) {
    devicePixelRatio;
    this.getUserId();
  }

  public userId;
  public user;

  getUserId() {
    debugger;
    this.userId = this.myAcitvatedRouter.snapshot.params.id;
    this.BDCalls.getUser(this.userId).subscribe((response: res) => {
      debugger;
      this.user = response.user;
    });
  }
}
