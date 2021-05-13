import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { ShoppingCartModel, TodoModel } from '../../store/shopping-carts.state';
import { ShoppingCart } from '../../store/shoppingcart/actions';
import { Tag } from '../../store/tags/actions';
import { TagsModel } from '../../store/tags.state';

@Component({
  selector: 'huber-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input()
  todos$: TodoModel[];

  @Input()
  shoppingCart: ShoppingCartModel;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  toggleStatus(todo: TodoModel): void {
    this.store.dispatch(new ShoppingCart.ToggleTodo(this.shoppingCart, todo));
  }

  deleteTodo(todo: TodoModel): void {
    this.store.dispatch(new ShoppingCart.DeleteTodo(this.shoppingCart, todo));
  }

  decreaseAmount(todo: TodoModel): void {
    this.store.dispatch(
      new ShoppingCart.DecreaseAmountTodo(this.shoppingCart, todo)
    );
  }

  increaseAmount(todo: TodoModel): void {
    this.store.dispatch(
      new ShoppingCart.IncreaseAmountTodo(this.shoppingCart, todo)
    );
  }

  addTag(name: string): void {
    // TODO dispatch
    let newTag: TagsModel = {
      category: this.shoppingCart.category,
      tags: [name],
    };

    this.store.dispatch(new Tag.AddTag(newTag));
  }
}
