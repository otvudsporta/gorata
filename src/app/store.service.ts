import { Injectable } from '@angular/core';
import { User } from 'firebase';

import { AuthService } from './auth.service';
import { Playground } from './playground';
import { PlaygroundService } from './playground.service';

@Injectable()
export class StoreService {
  constructor(
    private authService: AuthService,
    private playgroundService: PlaygroundService
  ) {
  }

  user = this.authService.angularFireAuth.authState;
  playgrounds = this.playgroundService.query();
}
