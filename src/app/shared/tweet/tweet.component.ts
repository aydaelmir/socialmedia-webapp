import { Component, Input } from '@angular/core';
import { Tweet } from '../../models/Tweet';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-tweet',
  standalone: true,
  imports: [UserAvatarComponent],
  templateUrl: './tweet.component.html',
  styleUrl: './tweet.component.css',
})
export class TweetComponent {
  @Input() userName: string = '';
  @Input() name: string = '';
  @Input() avatar: string = '';
  @Input() tweet!: Tweet;
}
