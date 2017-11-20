import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
    email: 'Имейл',
    password: 'Парола',
    passwordConfirmation: 'Потвърдете паролата',
    login: 'Вход',
    orRegister: 'или създай нов акаунт',
    register: 'Създай нов акаунт'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(data: LoginData) {
    this.loading = true;
    this.authService.login(data.email, data.password)
      .then(() => this.router.navigate(['/']))
      .catch(() => this.loading = false)
    ;
  }

  register(data: RegisterData) {
    if (data.password !== data.passwordConfirmation) {
      throw new Error(`Паролата не съвпада с потвърждението! Моля, опитайте отново!`);
    }

    this.loading = true;
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
      .catch(() => this.loading = false)
    ;
  }

  facebookRegister() {
    this.loading = true;
    this.authService.facebookRegister()
      .then(() => { /* TODO */ })
      .catch(() => this.loading = false)
    ;
  }
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  passwordConfirmation: string;
}
