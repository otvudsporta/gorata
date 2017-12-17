import { PlaygroundService } from '../playground.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { Playground } from '../playground';
import { StoreService } from '../store.service';
import { keys } from '../utils';

@Component({
  selector: 'PlaygroundDetails',
  template: `
    <ng-template #loading>
      <PageLoader></PageLoader>
    </ng-template>

    <div *ngIf="(playground$ | async) as playground; else loading">
      <img *ngFor="let imageUrl of playground.imageUrls" [src]="imageUrl" />

      <div class="pa-lg">
        <a *ngIf="(store.user$ | async)?.uid === playground.createdBy" [routerLink]="['edit']">✏️</a>

        <h4>{{playground.title}}</h4>

        <p>{{playground.address}}</p>

        <p>{{playground.text}}</p>

        <span *ngFor="let sport of keys(playground.sports)">{{sport}}&nbsp;</span>

        <br />

        <span *ngFor="let need of keys(playground.needs)">{{need}}&nbsp;</span>

        <p *ngIf="canModerate(store.role) && playground.name && playground.email">
          <a [href]="'mailto:' + playground.email">✉ {{playground.name}}</a>
        </p>
      </div>
    </div>
  `,
})
export class PlaygroundDetailsComponent implements OnInit {
  constructor(
    private playgroundService: PlaygroundService,
    private route: ActivatedRoute,
    public store: StoreService,
  ) {
  }

  playground$: Observable<Playground>;
  keys = keys;

  ngOnInit() {
    this.playground$ = this.route.paramMap.switchMap((params: ParamMap) => this.playgroundService.get(params.get('id')));
  }

  canModerate(role: string) {
    return role === 'moderator' || role === 'admin';
  }
}
