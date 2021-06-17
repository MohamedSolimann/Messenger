import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackenCallsService {
  constructor(public myHttp: HttpClient) {}

  addContact(data) {
    return this.myHttp.post('http://localhost:8080/contacts', data, {
      headers: { 'Content-Type': 'Application/JSON' },
      withCredentials: true,
    });
  }
  addMessage(data) {
    return this.myHttp.post('http://localhost:8080/messages/', data, {
      headers: { 'Content-Type': 'Application/JSOn' },
      withCredentials: true,
    });
  }
}
