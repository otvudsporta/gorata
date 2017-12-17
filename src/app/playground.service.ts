import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Playground } from './playground';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaygroundService {
  constructor(private db: AngularFireDatabase) {
  }

  createId(): string {
    return this.db.createPushId();
  }

  getDefault(): Partial<Playground> {
    return {
      imageUrls: [],
      sports: {},
      needs: {}
    };
  }

  query() {
    return this.db.list('playgrounds').snapshotChanges().map((actions) => actions.map((action) =>
      (<Playground>{ id: action.payload.key, ...action.payload.val() })
    ));
  }

  get(id: string): Observable<Playground> {
    return this.db.object(`playgrounds/${id}`).valueChanges<Playground>().map((playground) => ({ ...playground, id }));
  }

  create(data: Partial<Playground>): Promise<string> {
    const ref = this.db.list<Partial<Playground>>('playgrounds').push({
      ...data,
      created: <number>firebase.database.ServerValue.TIMESTAMP,
      status: 'new'
    });
    return new Promise<void>((resolve, reject) => ref.then(resolve, reject)).then(() => ref.key);
  }

  update({ id, ...data }: Partial<Playground>): Promise<string> {
    if (!id) throw new Error(`Invalid playground ID: ${id}`);

    return new Promise<void>((resolve, reject) =>
      this.db.object<Partial<Playground>>(`playgrounds/${id}`).update(data).then(resolve, reject)
    ).then(() => id);
  }
}
