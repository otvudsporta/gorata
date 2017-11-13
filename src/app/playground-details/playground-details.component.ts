import { PlaygroundService } from '../playground.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { Playground } from '../playground';
import { keys } from '../utils';

@Component({
  selector: 'PlaygroundDetails',
  templateUrl: './playground-details.component.html',
  styleUrls: ['./playground-details.component.css']
})
export class PlaygroundDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private playgroundService: PlaygroundService) {
  }

  playground$: Observable<Playground>;
  keys = keys;

  ngOnInit() {
    this.playground$ = this.route.paramMap.switchMap((params: ParamMap) => this.playgroundService.get(params.get('id')));
  }
}
