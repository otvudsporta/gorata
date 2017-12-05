import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Playground } from '../playground';
import { PlaygroundService } from '../playground.service';

@Component({
  selector: 'PlaygroundEdit',
  templateUrl: './playground-edit.component.html',
  styleUrls: ['./playground-edit.component.css']
})
export class PlaygroundEditComponent implements OnInit {
  playground$: Observable<Playground>;

  constructor(
    private playgroundService: PlaygroundService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.playground$ = this.route.paramMap
      .switchMap((params: ParamMap) => this.playgroundService.get(params.get('id')))
      .map((playground) => ({
        ...this.playgroundService.getDefault(),
        ...playground
      }))
    ;
  }
}
