import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'Header',
  template: `
    <a class="logo-link" routerLink="/">
      <img class="logo-image" src="assets/logo.png" alt="Отвъд Спорта Лого" />
    </a>

    <a routerLink="/new">Добави Игрище</a>

    &nbsp;|&nbsp;

    <a *ngIf="(store.user$ | async) == null" routerLink="/login">Вход</a>

    <ng-container *ngIf="(store.user$ | async) != null">
      <!-- <a routerLink="/settings">Настройки</a>
      &nbsp;|&nbsp; -->
      <a *ngIf="(store.user$ | async) != null" routerLink="/" (click)="logout()">Изход</a>
    </ng-container>
  `,
  styles: [`
    :host {
      grid-row: 1;
      grid-column: 1;

      display: flex;
      align-items: center;
      background: var(--primary);
      color: var(--neutral-lighter);
    }

    .logo-link {
      display: flex;
      align-items: center;
    }

    .logo-image {
      width: 64px;
      margin: 6px;
    }
  `]
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    public store: StoreService,
  ) {
  }

  logout() {
    return this.authService.logout();
  }
}
