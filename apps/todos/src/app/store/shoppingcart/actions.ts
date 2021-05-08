import { ShoppingCartModel } from '../todos.state';

export class AddShoppingCart {
  static readonly type = '[Shopping Cart] Add Shoppingcart';
  constructor(public shoppingCart: ShoppingCartModel) {}
}
