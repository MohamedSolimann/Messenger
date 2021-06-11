import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignUpBackendCallsSerivce {
  constructor(public myHttp: HttpClient) {}
  SignUp(data) {
    return this.myHttp.post('http://localhost:8080/users', data, {
      headers: { 'Content-Type': 'Application/Json' },
    });
  }
}
