import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent implements OnInit, OnChanges {
  @Input() src: string | undefined = '';
  @Input() id: string | undefined = '';
  @Input() userName = '';
  @Input() name = '';
  @Input() isCircle = true;
  @Input() hasSize = '';
  @Input() isNotAUser = false;

  @Output() avatarClicked = new EventEmitter<string>();

  defaultBackground = '#838383';
  first2CharctersOfUsername = '';

  sizesClasses: { [key: string]: string } = {
    xxl: 'avatar-xxlarge',
    xl: 'avatar-xlarge',
    l: 'avatar-large',
    s: 'avatar-small',
    m: 'avatar-medium',
    xs: 'avatar-xsmall',
    xxs: 'avatar-xxsmall',
    xxxs: 'avatar-xxxsmall',
  };

  sourceImage: string | undefined = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.sourceImage = this.src;
    if (changes['src']) this.sourceImage = changes['src'].currentValue;
    if (changes['hasSize']) this.hasSize = changes['hasSize'].currentValue;
    this.first2CharctersOfUsername = this.getTheFirst2CharactersOfUsername();
  }

  ngOnInit(): void {
    this.hasSize = this.getClassNameBySize();
  }
  emitClick() {
    this.avatarClicked.emit(this.id);
  }

  getTheFirst2CharactersOfUsername(): string {
    let first2CharctersOfUsername = 'UN';

    if (this.userName) {
      const usernameAsArray = this.userName.split(' ');
      if (this.isNotAUser) {
        first2CharctersOfUsername = this.userName;
      } else if (usernameAsArray.length >= 2) {
        if (usernameAsArray[0] && usernameAsArray[1]) {
          const firstCharacterofFirstName = usernameAsArray[0][0];
          const firstCharacterofLastName = usernameAsArray[1][0];

          first2CharctersOfUsername = (
            firstCharacterofFirstName + firstCharacterofLastName
          ).toUpperCase();
        }
      }
    }

    return first2CharctersOfUsername;
  }

  getClassNameBySize(): string {
    return this.hasSize ? this.sizesClasses[this.hasSize] : '';
  }
}
