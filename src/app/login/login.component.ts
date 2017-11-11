import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.auth.login(email, password).then(() => this.router.navigate(['/']));
  }
}
