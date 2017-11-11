import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, public store: StoreService) {
  }

  ngOnInit() {
  }

  logout() {
    return this.authService.logout();
  }
}
