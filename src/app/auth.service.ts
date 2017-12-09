import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// import * as facebook from './facebook';

@Injectable()
export class AuthService {
  constructor(public angularFireAuth: AngularFireAuth) {
  }

  // facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  register(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  anonymousLogin() {
    return this.angularFireAuth.auth.signInAnonymously();
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  // facebookLogin() {
  //   return this.angularFireAuth.auth.signInWithPopup(this.facebookAuthProvider);
  // }

  // facebookLinkAccount() {
  //   return this.angularFireAuth.auth.currentUser.linkWithPopup(this.facebookAuthProvider);
  // }

  // facebookGetUserInfo(scope?: string[], fields?: string[]) {
  //   return facebook.login(scope).then(() => facebook.api(fields));
  // }
}
