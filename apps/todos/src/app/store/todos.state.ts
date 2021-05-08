import { TagsService } from './../shared/tags.service';
import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { TodoService } from '../shared/todo.service';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddShoppingCart } from './shoppingcart/actions';

export interface ShoppingCartModel {
  id?: string;
  name: string;
  category: string;
  todos: TodoModel[];
}
export interface TodoModel {
  id?: string;
  name: string;
  amount?: number;
  finished: boolean;
}

@State<ShoppingCartModel[]>({
  name: 'shoppinglists',
  defaults: [
    {
      name: 'Billa',
      category: 'Lebensmittel',
      todos: [
        {
          name: 'Eier',
          finished: false,
        },
        {
          name: 'Mehl',
          finished: false,
        },
      ],
    },
    {
      name: 'DM',
      category: 'Pflegeartikel',
      todos: [
        {
          name: 'Shampoo',
          finished: false,
        },
        {
          name: 'Waschmittel',
          finished: false,
        },
      ],
    },
  ],
})
@Injectable()
export class ShoppingListState implements NgxsOnInit {
  constructor(private todoService: TodoService) {}

  ngxsOnInit(ctx: StateContext<TodoModel[]>) {
    console.log('State initialized, now getting shopping carts');
    // ctx.dispatch(new GetTodos());
  }

  @Action(AddShoppingCart)
  addShoppingCart(
    ctx: StateContext<ShoppingCartModel[]>,
    action: AddShoppingCart
  ) {
    const state = ctx.getState();
    ctx.setState([...state, action.shoppingCart]);
  }
}
