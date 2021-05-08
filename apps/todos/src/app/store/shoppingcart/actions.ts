import { ShoppingCartModel, TodoModel } from '../todos.state';

export namespace ShoppingCart {
  export class FetchShoppingCarts {
    static readonly type = '[Shopping Cart] Fetch Shoppingcarts';
    constructor() {}
  }
  export class AddShoppingCart {
    static readonly type = '[Shopping Cart] Add Shoppingcart';
    constructor(public shoppingCart: ShoppingCartModel) {}
  }

  export class DeleteShoppingCart {
    static readonly type = '[Shopping Cart] Delete Shoppingcart';
    constructor(public shoppingCart: ShoppingCartModel) {}
  }

  export class UpdateShoppingCart {
    static readonly type = '[Shopping Cart] Update ShoppingCart';
    constructor(public shoppingCart: ShoppingCartModel) {}
  }

  export class ToggleTodo {
    static readonly type = '[Shopping Cart -> Todo] Toggle Todo';
    constructor(
      public shoppingCart: ShoppingCartModel,
      public todo: TodoModel
    ) {}
  }

  export class DeleteTodo {
    static readonly type = '[Shopping Cart -> Todo] Delete Todo';
    constructor(
      public shoppingCart: ShoppingCartModel,
      public todo: TodoModel
    ) {}
  }
}
