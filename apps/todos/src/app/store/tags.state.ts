import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Tag } from './tags/actions';
import { TagsService } from '../shared/firebase/db/tags.service';

export interface TagsModel {
  id?: string;
  category: string;
  tags: string[];
}

@State<TagsModel[]>({
  name: 'tags',
  defaults: [
    /* {
      category: 'Lebensmittel',
      tags: ['Eier', 'Mehl'],
    },
    {
      category: 'Pflegeprodukte',
      tags: ['Shampoo', 'Duschgel'],
    }, */
  ],
})
@Injectable()
export class TagsState implements NgxsOnInit {
  constructor(private tagsService: TagsService) {}

  ngxsOnInit(ctx?: StateContext<TagsModel[]>) {}

  @Action(Tag.AddTag)
  addTag(ctx: StateContext<TagsModel[]>, action: Tag.AddTag) {
    const state = ctx.getState();
    return this.tagsService.addTag(action.tag);
  }

  @Selector()
  static categories(state: TagsModel[]): string[] {
    return state.map((s) => s.category);
  }
}
