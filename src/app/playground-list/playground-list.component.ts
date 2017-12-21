import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'PlaygroundList',
  template: `
    <ng-template #loading>
      <PageLoader></PageLoader>
    </ng-template>

    <div *ngIf="(store.playgrounds$ | async) as playgrounds; else loading">
      <a *ngFor="let playground of playgrounds" class="list-item" [routerLink]="playground.id">
        <AspectRatioContainer x="4" y="3" class="bg-neutral-light">
          <img class="image absolute stretch" [src]="playground.imageUrls && playground.imageUrls[0] || 'assets/default.png'" />
        </AspectRatioContainer>

        <div class="pa-md">
          <h4>{{playground.title}}</h4>
          <p>{{playground.address}}</p>
          <p>{{playground.text}}</p>
        </div>
      </a>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .list-item {
      display: grid;
      grid-template-columns: 128px 1fr auto;
    }

    .list-item + .list-item {
      border-top: 1px solid var(--neutral-light);
    }
  `]
})
export class PlaygroundListComponent {
  constructor(public store: StoreService) {
  }
}
