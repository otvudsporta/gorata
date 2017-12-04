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
    name: 'Име',
    email: 'Имейл',
    password: 'Парола',
    passwordConfirmation: 'Потвърдете паролата',
    login: 'Вход',
    orRegister: 'или създай нов акаунт',
    register: 'Създай нов акаунт',

    loginFailed: 'Невалидна комбинация от имейл и парола. Моля, опитайте отново!',
    facebookLoginFailed: 'Неуспешен вход с Facebook!'
  };

  constructor(
    private authService: AuthService,
    private notify: NotificationsService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(data: LoginData) {
    this.loading = true;
    this.authService.login(data.email, data.password)
      .then(() => this.router.navigate(['/']))
      .catch(() => {
        this.notify.error(this.i18n.loginFailed);
        this.loading = false;
      })
    ;
  }

  register(data: RegisterData) {
    if (data.password !== data.passwordConfirmation) {
      throw new Error(`Паролата не съвпада с потвърждението! Моля, опитайте отново!`);
    }

    this.loading = true;
    // TODO: Save user name into the database
    // TODO: Save user Facebook ID
    this.authService.register(data.email, data.password)
      .then(() => this.router.navigate(['/']))
      .catch(() => this.loading = false)
    ;
  }

  facebookLogin() {
    // TODO: Show an error prompting the user to first login, then link their existing account to Facebook
    this.loading = true;
    this.authService.facebookLogin()
      .then(() => this.router.navigate(['/']))
      .catch(() => {
        this.notify.error(this.i18n.facebookLoginFailed);
        this.loading = false;
      })
    ;
  }

  facebookRegister() {
    this.loading = true;
    const scope = ['public_profile', 'email'];
    const fields = ['name', 'email'];
    this.authService.facebookGetUserInfo(scope, fields)
      .then((user) => {
        fields.forEach((field) => {
          if (!this.data.register[field] && user[field]) {
            this.data.register[field] = user[field];
          }
        });
        this.loading = false;
      })
      .catch((error) => {
        this.notify.error(error && error.message || error);
        this.loading = false;
      })
    ;
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
