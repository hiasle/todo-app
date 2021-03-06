import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShoppingCart } from './shoppingcart/actions';
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
export class ShoppingCartsState implements NgxsOnInit {
  constructor(private shoppingCartService: ShoppingCartService) {}

  data: ShoppingCartModel[];

  ngxsOnInit(ctx: StateContext<ShoppingCartModel[]>) {
    ctx.dispatch(new ShoppingCart.FetchShoppingCarts());
  }

  @Action(ShoppingCart.FetchShoppingCarts)
  fetchShoppingCarts(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.FetchShoppingCarts
  ) {
    const state = ctx.getState();
    return this.shoppingCartService
      .fetchShoppingCarts()
      .pipe(map((data) => ctx.setState([...data])));
  }

  @Action(ShoppingCart.AddShoppingCart)
  addShoppingCart(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.AddShoppingCart
  ) {
    const state = ctx.getState();
    return this.shoppingCartService
      .addShoppingCart(action.shoppingCart)
      .pipe(tap(() => ctx.setState([...state, action.shoppingCart])));
  }

  @Action(ShoppingCart.DeleteShoppingCart)
  deleteShoppingCart(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.DeleteShoppingCart
  ) {
    return this.shoppingCartService.deleteShoppingCart(action.shoppingCart);
  }

  @Action(ShoppingCart.UpdateShoppingCart)
  updateShoppingCart(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.UpdateShoppingCart
  ) {
    return this.shoppingCartService.updateShoppingCart(action.shoppingCart);
  }

  @Action(ShoppingCart.ToggleTodo)
  toggleTodo(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.ToggleTodo
  ) {
    const modifiedTodos = action.shoppingCart.todos.map((t) => {
      if (t.id === action.todo.id) {
        return { ...t, finished: !t.finished };
      }
      return t;
    });
    ctx.dispatch(
      new ShoppingCart.UpdateShoppingCart({
        ...action.shoppingCart,
        todos: modifiedTodos,
      })
    );
  }

  @Action(ShoppingCart.DeleteTodo)
  deleteTodo(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.DeleteTodo
  ) {
    const modifiedTodos = action.shoppingCart.todos.filter(
      (t) => t.id !== action.todo.id
    );
    ctx.dispatch(
      new ShoppingCart.UpdateShoppingCart({
        ...action.shoppingCart,
        todos: modifiedTodos,
      })
    );
  }

  @Action(ShoppingCart.IncreaseAmountTodo)
  increaseAmountTodo(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.IncreaseAmountTodo
  ) {
    const modifiedTodos = action.shoppingCart.todos.map((t) => {
      if (t.id === action.todo.id) {
        console.log('Todo before: ', t);
        const modified = {
          ...t,
          amount: this.increaseAmount(t.amount),
        };
        console.log('Todo after: ', modified);
        return modified;
      }
      return t;
    });
    ctx.dispatch(
      new ShoppingCart.UpdateShoppingCart({
        ...action.shoppingCart,
        todos: modifiedTodos,
      })
    );
  }

  @Action(ShoppingCart.DecreaseAmountTodo)
  decreaseAmountTodo(
    ctx: StateContext<ShoppingCartModel[]>,
    action: ShoppingCart.DecreaseAmountTodo
  ) {
    const modifiedTodos = action.shoppingCart.todos.map((t) => {
      if (t.id === action.todo.id) {
        console.log('Todo before: ', t);
        const modified = {
          ...t,
          amount: this.decreaseAmount(t.amount),
        };
        console.log('Todo after: ', modified);
        return modified;
      }
      return t;
    });
    ctx.dispatch(
      new ShoppingCart.UpdateShoppingCart({
        ...action.shoppingCart,
        todos: modifiedTodos,
      })
    );
  }

  // DecreaseAmountTodo, IncreaseAmountTodo, AddTag

  private increaseAmount(amount?: number): number {
    if (amount || amount === 0) {
      return amount + 1;
    } else {
      return 0;
    }
  }

  private decreaseAmount(amount?: number): number {
    if (amount && amount !== 0) {
      return amount - 1;
    } else {
      return 0;
    }
  }
}
