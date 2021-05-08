import { ShoppingCartModel } from '../todos.state';

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
