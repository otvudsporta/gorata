import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'Header',
  template: `
    <a class="logo__link" routerLink="/">
      <img class="logo__image" src="assets/logo.svg" alt="Отвъд Спорта Лого" />
    </a>

    <a routerLink="/">Добави Игрище</a>

    <a routerLink="/playgrounds">Игрища</a>

    <a *ngIf="(store.user$ | async) == null" routerLink="/login">Вход</a>
    <a *ngIf="(store.user$ | async) != null" routerLink="/" (click)="logout()">Изход</a>

    <div class="toggle border-primary bg-primary br-md pointer" (click)="showSidebarChange.emit(!showSidebar)">
      <img class="toggle__image" [src]="showSidebar ? 'assets/chevron-up.svg' : 'assets/chevron-down.svg'" />
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: var(--neutral-lighter);
    }

    .logo__link {
      display: flex;
      align-items: center;
    }

    .logo__image {
      width: 64px;
      margin: 6px;
    }

    .toggle {
      user-select: none;
      box-shadow: var(--box-shadow);
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }

    .toggle__image {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    public store: StoreService,
  ) {
  }

  @Input() showSidebar: boolean;
  @Output() showSidebarChange = new EventEmitter<boolean>();

  logout() {
    return this.authService.logout();
  }
}
