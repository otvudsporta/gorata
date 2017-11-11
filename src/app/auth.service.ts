import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';

@Injectable()
export class AuthService {
  user: User;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => this.user = user);
  }

  login(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.auth.signOut();
  }
}
