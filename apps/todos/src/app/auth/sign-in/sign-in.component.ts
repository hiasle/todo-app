import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/firebase/auth/auth.service';
import { Login } from '../../shared/firebase/auth/login.model';

@Component({
  selector: 'huber-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  login() {
    console.log('Credentials: ', this.loginForm.value);
    this.authService.SignIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  get emailCtrl(): FormControl {
    return this.loginForm.controls['email'] as FormControl;
  }

  get pwdCtrl(): FormControl {
    return this.loginForm.controls['password'] as FormControl;
  }
}
