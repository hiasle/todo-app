import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, timer } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'huber-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  timer$: Observable<Time>;

  constructor() {}

  ngOnInit(): void {
    this.timer$ = interval(1).pipe(
      mergeMap((value, index) => {
        console.log('value: ', value, ', index: ', index);
        return of<Time>({
          minutes: `${((value - (value % 60)) / 60) % 60}`.padStart(2, '0'),
          seconds: `${value % 60}`.padStart(2, '0'),
        });
      })
    );
  }

  transform(value: Time): string {
    return `${value.minutes}:${value.seconds}`;
  }
}

export interface Time {
  minutes: string;
  seconds: string;
}
