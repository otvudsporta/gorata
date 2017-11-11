import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = {
    login: <LoginData>{},
    register: <RegisterData>{}
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(data: LoginData) {
    this.authService.login(data.email, data.password).then(() => this.router.navigate(['/']));
  }

  register(data: RegisterData) {
    if (data.password !== data.passwordConfirmation) {
      throw new Error(`Паролата не съвпада с потвърждението! Моля, опитайте отново!`);
    }

    this.authService.register(data.email, data.password).then(() => this.router.navigate(['/']));
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
