import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UserAvatarComponent } from '../../shared/user-avatar/user-avatar.component';
import { Account } from '../../models/Account';
import { SearchMenuComponent } from '../search-menu/search-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserAvatarComponent, SearchMenuComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() user!: Account;
  @Input() searchResults: Account[] | null = [];

  @ViewChild('searchInputRef') searchInputRef!: ElementRef<HTMLInputElement>;
  @Output() onSearchEmitter = new EventEmitter();
  @Output() onAvatarClick = new EventEmitter();
  @Output() onUserClick = new EventEmitter();

  searchTimeout: any;
  searchKey: string = '';

  onKeyUp() {
    this.searchTimeout = setTimeout(() => {
      this.emitSearchKey();
    }, 300);
  }

  emitSearchKey() {
    let searchKey = this.searchInputRef.nativeElement.value;
    this.onSearchEmitter.emit(searchKey);
  }

  onKeyDown() {
    this.searchTimeout = null;
  }

  avatarClick() {
    this.onAvatarClick.emit();
  }

  userClick(id: string) {
    this.onUserClick.emit(id);
  }
}
