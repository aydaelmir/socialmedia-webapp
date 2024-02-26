import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Account } from '../models/Account';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.baseUrl + '';
  constructor(
    private appService: AppService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  login(user: { userName: string; password: string }) {
    return this.httpClient
      .post<Account>(this.baseUrl + '/authenticate', user)
      .pipe(
        tap((userLogin: any) => {
          this.navigateToUser(userLogin);
        })
      );
  }

  signUp(userAccount: Account) {
    this.httpClient
      .post(this.baseUrl + '/register', userAccount)
      .subscribe((response: any) => {
        this.navigateToUser(response.account);
      });
  }

  navigateToUser(userLogin: any) {
    this.appService.setUserInfo(userLogin);
    this.router.navigateByUrl('/tweets');
  }
}
