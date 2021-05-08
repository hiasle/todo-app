import {
  FinishTodo,
  DeleteTodo,
  DecreaseAmountTodo,
  IncreaseAmountTodo,
  AddTag,
} from './../../store/actions';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TodoModel } from '../../store/state';
import { Store } from '@ngxs/store';
import { ShoppingCart } from '../../store/shoppingcart/actions';
import { ShoppingCartModel } from '../../store/todos.state';

@Component({
  selector: 'huber-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
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

  decreaseAmount(id: string): void {
    this.store.dispatch(new DecreaseAmountTodo(id));
  }

  increaseAmount(id: string): void {
    this.store.dispatch(new IncreaseAmountTodo(id));
  }

  addTag(name: string): void {
    this.store.dispatch(new AddTag({ name: name }));
  }
}
