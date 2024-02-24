import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environment/environment';
import { AppService } from '../app.service';
import { Comment } from '../models/Comment';
import { Tweet } from '../models/Tweet';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private appService: AppService) {}

  tweetsSource: BehaviorSubject<Tweet[]> = new BehaviorSubject<Tweet[]>([]);
  tweets$ = this.tweetsSource.asObservable();

  get tweets() {
    return this.tweetsSource.value;
  }

  set tweets(tweets: Tweet[]) {
    this.tweetsSource.next(tweets);
  }

  get currentUser() {
    return this.appService.userAccount;
  }

  getFypTweets() {
    let accountId = this.currentUser._id;
    this.httpClient
      .get<Tweet[]>(this.baseUrl + '/fyptweets/' + accountId)
      .subscribe((tweets: any[]) => {
        tweets.map((t) => {
          t.user = t.accountId;
          t.user.accountId = t.accountId._id;
          t.id = t._id;
        });
        console.log(tweets);
        this.tweets = [...tweets];
      });
  }

  like(tweetId: number) {
    let body = {
      tweetId,
      userId: this.currentUser._id,
    };
    return this.httpClient.post(this.baseUrl + '/like', body);
  }

  removeLike(tweetId: number) {}

  comment(tweetId: number, commentText: string) {
    console.log(commentText);
    let body = {
      tweetId,
      text: commentText,
      userId: this.currentUser._id,
    };
    return this.httpClient.post<Comment>(this.baseUrl + '/comment', body).pipe(
      map((comment: any) => {
        comment.user = this.currentUser;
        return comment;
      })
    );
  }

  getCommentsForTweet(tweetId: number) {
    return this.httpClient
      .get<Comment[]>(this.baseUrl + '/comments/' + tweetId)
      .pipe(
        map((comments: any) => {
          return comments.map((c: any) => {
            c.user = c.userId;
            return c;
          });
        })
      );
  }

  getLikesForTweet(tweetId: number) {
    return this.httpClient.get<any[]>(this.baseUrl + '/likes/' + tweetId).pipe(
      map((likes: any) => {
        console.log(likes);
        likes = likes.map((u: any) => u.userId);
        return likes;
      })
    );
  }

  post(tweetText: string) {
    let body = {
      accountId: this.currentUser._id,
      content: tweetText,
    };
    this.httpClient
      .post<Tweet>(this.baseUrl + '/tweet', body)
      .subscribe((res: Tweet) => {
        res.user = this.currentUser;
        this.tweets = [res, ...this.tweets];
      });
  }
}
