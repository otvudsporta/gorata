import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { Playground } from '../playground';
import { PlaygroundService } from '../playground.service';

@Component({
  selector: 'PlaygroundList',
  templateUrl: './playground-list.component.html',
  styleUrls: ['./playground-list.component.css']
})
export class PlaygroundListComponent implements OnInit {
  playgrounds: Observable<Playground[]>;

  constructor(private playgroundService: PlaygroundService) {
  }

  ngOnInit() {
    this.playgrounds = this.playgroundService.query();
  }
}
