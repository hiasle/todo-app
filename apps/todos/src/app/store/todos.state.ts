import { TagsService } from './../shared/tags.service';
import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { TodoService } from '../shared/todo.service';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  AddShoppingCart,
  FetchShoppingCarts,
  DeleteShoppingCart,
} from './shoppingcart/actions';
import { ShoppingCartService } from '../shared/firebase/db/shopping-cart.service';

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
    /* {
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
    }, */
  ],
})
@Injectable()
export class ShoppingListState implements NgxsOnInit {
  constructor(
    private todoService: TodoService,
    private shoppingCartService: ShoppingCartService
  ) {}

  data: ShoppingCartModel[];

  ngxsOnInit(ctx: StateContext<ShoppingCartModel[]>) {
    console.log('State initialized, now getting shopping carts');
    /* this.shoppingCartService
      .fetchShoppingCarts()
      .pipe(
        map((data) => data as ShoppingCartModel[]),
        tap((data) => console.log('Shopping cart data from Firestore: ', data))
      )
      .subscribe((data) => {
        this.data = data;
      });

    console.log('Shopping cart data: ', this.data); */
    ctx.dispatch(new FetchShoppingCarts());
  }

  @Action(FetchShoppingCarts)
  fetchShoppingCarts(
    ctx: StateContext<ShoppingCartModel[]>,
    action: FetchShoppingCarts
  ) {
    const state = ctx.getState();
    return this.shoppingCartService
      .fetchShoppingCarts()
      .pipe(map((data) => ctx.setState([...data])));
  }

  @Action(AddShoppingCart)
  addShoppingCart(
    ctx: StateContext<ShoppingCartModel[]>,
    action: AddShoppingCart
  ) {
    const state = ctx.getState();
    return this.shoppingCartService
      .addShoppingCart(action.shoppingCart)
      .pipe(tap(() => ctx.setState([...state, action.shoppingCart])));
  }

  @Action(DeleteShoppingCart)
  deleteShoppingCart(
    ctx: StateContext<ShoppingCartModel[]>,
    action: DeleteShoppingCart
  ) {
    return this.shoppingCartService.deleteShoppingCart(action.shoppingCart);
  }
}
