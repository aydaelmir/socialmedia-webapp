import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login/login.component';
import { UserProfileComponent } from './user-profile-page/user-profile/user-profile.component';
import { TweetsComponent } from './fyp/tweets/tweets.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'tweets', component: TweetsComponent },
];
