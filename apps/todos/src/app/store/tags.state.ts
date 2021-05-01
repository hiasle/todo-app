import { AddTag, GetTags } from './actions';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import { TagsService } from '../shared/tags.service';
import { of } from 'rxjs';

export interface TagsModel {
  id?: string;
  name: string;
}

@State<TagsModel[]>({
  name: 'tagsList',
  defaults: [],
})
@Injectable()
export class TagsState implements NgxsOnInit {
  constructor(private tagsService: TagsService) {}

  ngxsOnInit(ctx: StateContext<TagsModel[]>) {
    console.log('State initialized, now getting animals');
    ctx.dispatch(new GetTags());
  }

  @Action(GetTags)
  getTags(ctx: StateContext<TagsModel[]>) {
    const state = ctx.getState();
    return this.tagsService.fetchTags().pipe(
      tap((tags) => console.log('Tagsservice called getTags: ', tags)),
      map((tags) => ctx.setState([...tags]))
    );
  }

  @Action(AddTag)
  addTag(ctx: StateContext<TagsModel[]>, action: AddTag) {
    if (ctx.getState().find((t) => t.name === action.tag.name)) {
      return of(ctx.getState());
    } else {
      return this.tagsService.addTag(action.tag).pipe(
        tap((tag) => console.log('Tagsservice called addTag: ', tag)),
        tap((tag) => console.log([...ctx.getState(), tag])),
        map((tag) => ctx.setState([...ctx.getState(), tag]))
      );
    }
  }

  @Selector()
  static tagNames(state: TagsModel[]) {
    return state.map((s) => s.name);
  }
}
