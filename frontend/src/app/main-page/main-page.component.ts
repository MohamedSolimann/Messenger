import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { res } from '../data.models';
import { SignInBackendCallsSerivce } from '../sign-in/service/backendCalls.service';
import { NavigationService } from '../sign-up/service/navigation.service';
import { BackenCallsService } from './service/backendCalls';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(
    public myAcitvatedRouter: ActivatedRoute,
    public userBDCalls: SignInBackendCallsSerivce,
    public myBDCalls: BackenCallsService,
    public myNavigation: NavigationService
  ) {
    devicePixelRatio;
    this.getUserId();
  }

  public userId;
  public user;
  public userContacts;
  public moblieNumberToBeAdded: Number;
  public responseMessage;
  public selectedContactUsername;

  getUserId() {
    this.userId = this.myAcitvatedRouter.snapshot.params.id;
    this.userBDCalls.getUser(this.userId).subscribe((response: res) => {
      this.user = response.user;
      this.userContacts = response.user.contacts;
    });
  }
  addContact() {
    debugger;
    const { userId, moblieNumberToBeAdded } = this;
    const data = { mobile: moblieNumberToBeAdded, userId };
    this.myBDCalls.addContact(data).subscribe((response: res) => {
      this.user = response.updatedUser;
      debugger;
      this.responseMessage = response.message;
      this.myNavigation.refreshPage(`/main/${this.user._id}`);
    });
  }

  signOut() {
    this.userBDCalls.SignOut().subscribe((response: res) => {
      if (response.message === 'Success') {
        this.myNavigation.navigateTo('/signin');
      }
    });
  }
  getContactId(contactUsername) {
    this.selectedContactUsername = contactUsername;
  }
}
