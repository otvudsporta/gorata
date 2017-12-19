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
      <img *ngFor="let imageUrl of playground.imageUrls" class="w-100p" [src]="imageUrl" />

      <div class="pa-lg">
        <a *ngIf="(store.user$ | async)?.uid === playground.createdBy" [routerLink]="['edit']">✏️</a>

        <h4 class="mb-lg color-primary">{{playground.title}}</h4>

        <div *ngIf="playground.text" class="mb-lg">{{playground.text}}</div>

        <div class="mb-lg" *ngIf="keys(playground.sports).length > 0">
          {{i18n.sports}}:
          <div *ngFor="let sport of keys(playground.sports)">&bull;&nbsp;{{sport}}</div>
        </div>

        <div class="mb-lg" *ngIf="keys(playground.needs).length > 0">
          {{i18n.needs}}:
          <div *ngFor="let need of keys(playground.needs)">&bull;&nbsp;{{need}}</div>
        </div>

        <p *ngIf="canModerate(store.role) && playground.name && playground.email">
          <a [href]="'mailto:' + playground.email">✉ {{playground.name}}</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
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
  i18n = {
    sports: 'Спортове',
    needs: 'Има нужда от'
  };

  ngOnInit() {
    this.playground$ = this.route.paramMap.switchMap((params: ParamMap) => this.playgroundService.get(params.get('id')));
  }

  canModerate(role: string) {
    return role === 'moderator' || role === 'admin';
  }
}
