import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../../app.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  standalone: true,
  providers: [LoginService, AppService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  showValidationMessage: boolean = false;

  constructor(private loginService: LoginService) {}

  login() {
    if (this.loginForm?.valid) {
      this.loginService
        .login(this.loginForm.value)
        .subscribe({
          error: (error: any) => {
            if (error) {
              this.showValidationMessage = true;
              setTimeout(() => {
                this.showValidationMessage = false;
              }, 6000);
            }
          },
        });
    }
  }
}
