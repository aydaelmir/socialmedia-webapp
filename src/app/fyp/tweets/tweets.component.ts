import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TweetsService } from '../tweets.service';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../app.service';
import { AddTweetFormComponent } from '../add-tweet-form/add-tweet-form.component';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../user-profile-page/user-data.service';
import { UserAvatarComponent } from '../../shared/user-avatar/user-avatar.component';
import { TweetComponent } from '../tweet/tweet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweets',
  standalone: true,
  imports: [
    HeaderComponent,
    AddTweetFormComponent,
    TweetComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [TweetsService, AppService, UserDataService],
  templateUrl: './tweets.component.html',
  styleUrl: './tweets.component.css',
})
export class TweetsComponent implements OnInit {
  addTweetFormShown: boolean = false;

  constructor(
    public tweetsService: TweetsService,
    public userDataService: UserDataService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.tweetsService.tweets.length) {
      this.tweetsService.getFypTweets();
    }
    if (!this.userDataService.followingsSource.value.length) {
      this.userDataService.getListOfFollowings();
    }
    // this.userDataService.follow('65bd22d2165d2c95a084bf62');
  }

  showAddTweetForm() {
    console.log('hi');
    this.addTweetFormShown = true;
  }

  hideAddTweetForm() {
    this.addTweetFormShown = false;
  }

  postTweet(tweet: any) {
    this.addTweetFormShown = false;
    this.tweetsService.post(tweet);
  }

  searchForUsers(searchKey: string) {
    this.userDataService.searchForUsers(searchKey);
  }

  visitProfile(id?: string) {
    this.router.navigateByUrl('profile/' + this.tweetsService.currentUser._id);
  }

  visitProfileById(id: string) {
    this.router.navigateByUrl('profile/' + id);
  }

  logOut() {
    this.router.navigateByUrl('');
    this.appService.logOut();
  }
}
