import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tweet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tweet-form.component.html',
  styleUrl: './add-tweet-form.component.scss',
})
export class AddTweetFormComponent {
  tweet: string = '';

  @Output() onPostEmitter = new EventEmitter();
  @Output() onCancelEmitter = new EventEmitter();

  postTweet() {
    this.onPostEmitter.emit(this.tweet);
  }

  cancel() {
    this.onCancelEmitter.emit();
  }
}
