import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Playground } from './playground';

@Injectable()
export class PlaygroundService {
  constructor(private db: AngularFireDatabase) {
  }

  query() {
    return this.db.list('playgrounds').valueChanges<Playground>();
  }

  get(id: string) {
    return this.db.object(`playgrounds/${id}`).valueChanges<Playground>();
  }
}
