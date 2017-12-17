import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'PlaygroundList',
  template: `
    <ng-template #loading>
      <PageLoader></PageLoader>
    </ng-template>

    <div *ngIf="(store.playgrounds$ | async) as playgrounds; else loading">
      <a *ngFor="let playground of playgrounds" class="list-item" [routerLink]="['/playgrounds', playground.id]">
        <img [src]="playground.imageUrls && playground.imageUrls[0] || 'assets/default.png'" />
        <div>
          <h4>{{playground.title}}</h4>
          <p>{{playground.address}}</p>
          <p>{{playground.text}}</p>
        </div>
      </a>
    </div>
  `,
  styles: [`
    .list-item {
      display: grid;
      grid-template-columns: 64px 1fr auto;
      grid-gap: 0.25rem;
      padding: 0.75rem;
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
