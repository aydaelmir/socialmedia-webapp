import { Injectable } from '@angular/core';
import { Account } from './models/Account';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  get userAccount() {
    var user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : user;
  }

  get isAuthenticated() {
    return this.userAccount !== null;
  }

  setUserInfo(userAccount: Account) {
    localStorage.setItem('currentUser', JSON.stringify(userAccount));
  }
}
