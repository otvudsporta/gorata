import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;

  data = {
    login: <LoginData>{},
    register: <RegisterData>{}
  };

  i18n = {
    anonymousLogin: 'Анонимен Вход',
    orLogin: 'или вход с вече съществуващ акаунт',
    name: 'Име',
    email: 'Имейл',
    password: 'Парола',
    passwordConfirmation: 'Потвърдете паролата',
    login: 'Вход',
    orRegister: 'или създай нов акаунт',
    register: 'Създай нов акаунт',

    // loginFailed: 'Невалидна комбинация от имейл и парола. Моля, опитайте отново!',
    // facebookLoginFailed: 'Неуспешен вход с Facebook!'
  };

  constructor(
    private authService: AuthService,
    private notify: NotificationsService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  anonymousLogin() {
    this.handlePromise(this.authService.anonymousLogin());
  }

  login(data: LoginData) {
    this.handlePromise(this.authService.login(data.email, data.password));
  }

  register(data: RegisterData) {
    if (data.password !== data.passwordConfirmation) {
      throw new Error(`Паролата не съвпада с потвърждението! Моля, опитайте отново!`);
    }

    this.handlePromise(this.authService.register(data.email, data.password));
  }

  // facebookLogin() {
  //   // TODO: Show an error prompting the user to first login, then link their existing account to Facebook
  //   this.loading = true;
  //   this.authService.facebookLogin()
  //     .then(() => this.router.navigate(['/']))
  //     .catch(() => {
  //       this.notify.error(this.i18n.facebookLoginFailed);
  //       this.loading = false;
  //     })
  //   ;
  // }

  // facebookRegister() {
  //   this.loading = true;
  //   const scope = ['public_profile', 'email'];
  //   const fields = ['name', 'email'];
  //   this.authService.facebookGetUserInfo(scope, fields)
  //     .then((user) => {
  //       fields.forEach((field) => {
  //         if (!this.data.register[field] && user[field]) {
  //           this.data.register[field] = user[field];
  //         }
  //       });
  //       this.loading = false;
  //     })
  //     .catch((error) => {
  //       this.notify.error(error && error.message || error);
  //       this.loading = false;
  //     })
  //   ;
  // }

  private handlePromise(promise: Promise<any>) {
    this.loading = true;
    return (
      promise
        .then(() => this.router.navigate(['/']))
        .catch((error) => {
          this.notify.error(error && error.message || error);
          this.loading = false;
        })
    );
  }
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
