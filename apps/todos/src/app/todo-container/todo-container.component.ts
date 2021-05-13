import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../store/shoppingcart/actions';
import {
  ShoppingCartModel,
  ShoppingCartsState,
} from '../store/shopping-carts.state';

@Component({
  selector: 'huber-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoContainerComponent implements OnInit {
  @Select(ShoppingCartsState) shoppingcarts$: Observable<ShoppingCartModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  deleteShoppingCart(shoppingCart: ShoppingCartModel) {
    this.store.dispatch(new ShoppingCart.DeleteShoppingCart(shoppingCart));
  }
}
