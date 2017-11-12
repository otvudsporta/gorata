import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

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

  create(data: Partial<Playground>) {
    return new Promise((resolve, reject) =>
      this.db.list<Partial<Playground>>('playgrounds').push({
        ...data,
        created: <number>firebase.database.ServerValue.TIMESTAMP,
        status: 'new'
      }).then(resolve, reject)
    );
  }
}
