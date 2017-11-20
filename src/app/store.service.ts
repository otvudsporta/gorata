import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase';

import { AuthService } from './auth.service';
import { Playground } from './playground';
import { PlaygroundService } from './playground.service';

export { User } from 'firebase';

@Injectable()
export class StoreService implements OnDestroy {
  constructor(
    private authService: AuthService,
    private playgroundService: PlaygroundService
  ) {
  }

  authenticated: boolean | undefined;
  user$ = this.authService.angularFireAuth.authState;
  playgrounds$ = this.playgroundService.query();

  mapResolve: Function;
  map = new Promise<google.maps.Map>((resolve) => this.mapResolve = resolve);

  subscriptions: Subscription[] = [
    this.authService.angularFireAuth.authState.subscribe((user) => this.authenticated = user != null)
  ];

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
