import { Component } from '@angular/core';
import { UserAvatarComponent } from '../../shared/user-avatar/user-avatar.component';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { TweetComponent } from '../../fyp/tweet/tweet.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Account } from '../../models/Account';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TweetsService } from '../../fyp/tweets.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserAvatarComponent,
    TweetComponent,
    HttpClientModule,
  ],
  providers: [UserDataService, AppService, TweetsService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  userId: string = '';
  user: Account | null = null;
  constructor(
    private route: ActivatedRoute,
    public userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId == this.userDataService.currentUser._id) {
      this.user = this.userDataService.currentUser;
    } else {
      this.userDataService.getUserById(this.userId).subscribe((user) => {
        this.user = user;
      });
    }
    this.userDataService.getTweets(this.userId);
  }
}
