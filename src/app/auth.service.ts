import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FacebookAPI } from './facebook';

@Injectable()
export class AuthService {
  constructor(public angularFireAuth: AngularFireAuth) {
  }

  facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  register(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  async facebookRegister() {
    const facebook = await FacebookAPI;
    console.log(facebook);
  }

  facebookLogin() {
    return this.angularFireAuth.auth.signInWithPopup(this.facebookAuthProvider);
  }

  facebookLinkAccount() {
    return this.angularFireAuth.auth.currentUser.linkWithPopup(this.facebookAuthProvider);
  }
}
