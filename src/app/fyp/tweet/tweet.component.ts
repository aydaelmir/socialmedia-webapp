import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class TweetComponent {
  @Input() tweet!: Tweet;

  @Output() onAvatarClick = new EventEmitter();
  writingComment: boolean = false;
  currentComment: string = '';

  constructor(private tweetService: TweetsService) {}

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

  like() {}

  visitProfile() {
    if (this.tweet.user)
      this.onAvatarClick.emit(this.tweet.user.accountId ?? '');
  }
}
