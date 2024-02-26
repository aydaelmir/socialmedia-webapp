import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, take } from 'rxjs';
import { Tweet } from '../models/Tweet';
import { UserRelation } from '../models/userRelation';
import { AppService } from '../app.service';
import { environment } from '../../environment/environment';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private readonly baseUrl = environment.baseUrl;
  followersSource: BehaviorSubject<UserRelation[]> = new BehaviorSubject<
    UserRelation[]
  >([]);
  followers$ = this.followersSource.asObservable();

  followingsSource: BehaviorSubject<UserRelation[]> = new BehaviorSubject<
    UserRelation[]
  >([]);
  following$ = this.followingsSource.asObservable();

  searchResultsSource: BehaviorSubject<Account[]> = new BehaviorSubject<
    Account[]
  >([]);
  searchResults$ = this.searchResultsSource.asObservable();

  tweetsSource: BehaviorSubject<Tweet[]> = new BehaviorSubject<Tweet[]>([]);
  tweets$ = this.tweetsSource.asObservable();

  get currentUser() {
    return this.appService.userAccount;
  }

  constructor(private httpClient: HttpClient, private appService: AppService) {}

  getTweets(userId: string) {
    this.httpClient
      .get<Tweet[]>(this.baseUrl + '/tweets/' + userId)
      .subscribe((tweets: any[]) => {
        tweets.map((t) => {
          t.user = t.accountId;
          t.id = t._id;
        });
        this.tweetsSource.next(tweets);
      });
  }

  getListOfFollowers() {
    let userId = this.currentUser.userId;
  }

  getListOfFollowings() {
    this.httpClient
      .get(this.baseUrl + '/followings/' + this.appService.userAccount._id)
      .subscribe((res: any) => {
        this.followingsSource.next(res);
      });
  }

  changeProfile() {}

  editProfileInfo() {}

  follow(accountId: string) {
    let body = {
      followerId: this.appService.userAccount._id,
      userId: accountId,
      followedBack: false,
    };

    return this.httpClient.post(this.baseUrl + '/follow', body);
  }

  searchForUsers(searchKey: string) {
    let body = {
      searchKey,
    };
    this.httpClient
      .post<Account[]>(this.baseUrl + '/search', body)
      .subscribe((res: any[]) => {
        res.map((u) => (u.accountId = u._id));
        this.searchResultsSource.next(res);
      });
  }

  getUserById(userId: string) {
    return this.httpClient.get<Account>(this.baseUrl + '/' + userId);
  }
}
