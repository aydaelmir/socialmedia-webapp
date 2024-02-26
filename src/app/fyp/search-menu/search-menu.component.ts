import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAvatarComponent } from '../../shared/user-avatar/user-avatar.component';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-search-menu',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './search-menu.component.html',
  styleUrl: './search-menu.component.css',
})
export class SearchMenuComponent {
  @Input() results: Account[] = [];
  @Output() onUserClick = new EventEmitter();

  userClick(id: string) {
    this.onUserClick.emit(id);
  }
}
