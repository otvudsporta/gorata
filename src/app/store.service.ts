import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase';

import { AuthService } from './auth.service';
import { Playground } from './playground';
import { PlaygroundService } from './playground.service';
import { Subscriber } from 'rxjs/Subscriber';

export { User } from 'firebase';

@Injectable()
export class StoreService implements OnDestroy {
  constructor(
    private authService: AuthService,
    private playgroundService: PlaygroundService
  ) {
  }

  authenticated: boolean | undefined;
  role: string | undefined;
  user$ = this.authService.getAuthState();
  playgrounds$ = this.playgroundService.query();

  mapResolve: Function;
  map = new Promise<google.maps.Map>((resolve) => this.mapResolve = resolve);

  private roleSubscriptions: Subscription[] = [];
  private subscriptions: Subscription[] = [
    this.authService.getAuthState().subscribe((user) => {
      if (this.authenticated == null && user == null) {
        this.authService.anonymousLogin();
      }

      this.authenticated = user != null && !user.isAnonymous;
      if (this.authenticated) {
        this.roleSubscriptions.forEach((subscription) => subscription.unsubscribe());
        this.roleSubscriptions = [
          this.authService.getUserRole(user.uid).subscribe((role) => this.role = role)
        ];
    }
    })
  ];

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
