import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from '../../models/Tweet';
import { UserAvatarComponent } from '../../shared/user-avatar/user-avatar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TweetsService } from '../tweets.service';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-tweet',
  standalone: true,
  imports: [UserAvatarComponent, CommonModule, FormsModule],
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.css',
})
export class TweetComponent implements OnInit {
  @Input() tweet!: Tweet;

  @Output() onAvatarClick = new EventEmitter();
  writingComment: boolean = false;
  currentComment: string = '';
  likedByUser: boolean = false;

  constructor(private tweetService: TweetsService) {}

  ngOnInit(): void {
    if (!this.tweet.likes) {
      console.log('likess');
      this.tweetService.getLikesForTweet(this.tweet.id).subscribe((likes) => {
        this.tweet.likes = likes;
        console.log(likes);
        this.likedByUser = likes.includes(this.tweetService.currentUser._id);
      });
    }
  }

  ToggleCommentForm() {
    if (!this.tweet.comments) {
      this.tweetService
        .getCommentsForTweet(this.tweet.id)
        .subscribe((comments: Comment[]) => {
          this.tweet.comments = comments;
        });
    }

    this.writingComment = !this.writingComment;
  }

  postComment() {
    this.tweetService
      .comment(this.tweet.id, this.currentComment)
      .subscribe((newComment: Comment) => {
        if (this.tweet.comments)
          this.tweet.comments = [newComment, ...this.tweet.comments];
        else this.tweet.comments = [newComment];
        this.currentComment = '';
      });
  }

  cancelComment() {
    this.currentComment = '';
    this.writingComment = false;
  }

  like() {
    this.tweetService.like(this.tweet.id).subscribe(() => {
      if (this.tweet.likes) {
        this.tweet.likes.push(this.tweetService.currentUser._id);
      } else {
        this.tweet.likes = [this.tweetService.currentUser._id];
      }
      this.likedByUser = true;
    });
  }

  visitProfile() {
    if (this.tweet.user)
      this.onAvatarClick.emit(this.tweet.user.accountId ?? '');
  }
}
