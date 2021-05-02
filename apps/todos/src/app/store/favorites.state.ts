import { Injectable } from '@angular/core';
import { NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

export interface FavoritesModel {
  id?: string;
  category: string;
  tags: string[];
}

@State<FavoritesModel[]>({
  name: 'favorites',
  defaults: [
    {
      category: 'Lebensmittel',
      tags: ['Eier', 'Mehl'],
    },
    {
      category: 'Pflegeprodukte',
      tags: ['Eier', 'Mehl'],
    },
  ],
})
@Injectable()
export class FavoritesState implements NgxsOnInit {
  ngxsOnInit(ctx?: StateContext<FavoritesModel[]>) {
    /* ctx.setState([
      {
        category: 'Lebensmittel',
        tags: ['Eier', 'Mehl'],
      },
    ]); */
  }

  @Selector()
  static categories(state: FavoritesModel[]): string[] {
    return state.map((s) => s.category);
  }
}
