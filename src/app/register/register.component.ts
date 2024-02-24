import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Account } from '../models/Account';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [LoginService, AppService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  matchingPasswords: boolean = true;
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  showValidationMessage: boolean = false;

  constructor(private loginService: LoginService) {}

  signUp() {
    if (this.registerForm.valid)
      if (
        this.registerForm.value.password !==
        this.registerForm.value.confirmPassword
      ) {
        setTimeout(() => {
          this.matchingPasswords = false;
        }, 3000);
      } else {
        let userAccount: Account = {
          accountId: '',
          userId: 0,
          userName: this.registerForm.value.userName,
          password: this.registerForm.value.password,
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
          birthDate: this.registerForm.value.birthDate,
          phoneNumber: this.registerForm.value.phoneNumber,
          nbOfFollowers: 0,
          nbOfFollowings: 0,
          isActivated: true,
          bio: '',
          creationDate: new Date(),
        };
        this.loginService.signUp(userAccount);
      }
  }
}
