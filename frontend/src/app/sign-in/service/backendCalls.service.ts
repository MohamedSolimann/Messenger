import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignInBackendCallsSerivce {
  constructor(public myHttp: HttpClient) {}
  SignIn(data) {
    return this.myHttp.post('http://localhost:8080/users/signin', data, {
      headers: { 'Content-Type': 'Application/Json' },
      withCredentials: true,
    });
  }
}
