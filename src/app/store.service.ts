import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Playground } from './playground';
import { PlaygroundService } from './playground.service';

export { User } from 'firebase';

@Injectable()
export class StoreService {
  constructor(
    private authService: AuthService,
    private playgroundService: PlaygroundService
  ) {
  }

  user$ = this.authService.angularFireAuth.authState;
  playgrounds$ = this.playgroundService.query();

  map = new Promise<google.maps.Map>((resolve) => this.mapResolve = resolve);
  mapResolve: Function;
}
