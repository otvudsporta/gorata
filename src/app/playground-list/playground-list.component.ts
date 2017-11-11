import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'PlaygroundList',
  templateUrl: './playground-list.component.html',
  styleUrls: ['./playground-list.component.css']
})
export class PlaygroundListComponent implements OnInit {
  constructor(public store: StoreService) {
  }

  ngOnInit() {
  }
}
