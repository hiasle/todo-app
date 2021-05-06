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
import { Observable } from 'rxjs';
import { TodoModel } from '../../store/state';
import { Store } from '@ngxs/store';
import { ShoppingCartService } from '../../shared/firebase/db/shopping-cart.service';

@Component({
  selector: 'huber-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input()
  todos$: TodoModel[];
  // todos$: Observable<TodoModel[]>;

  constructor(private store: Store, private scs: ShoppingCartService) {}

  ngOnInit(): void {
    this.scs.fetchUserCollection();
  }

  toggleStatus(todo: TodoModel): void {
    this.store.dispatch(new FinishTodo(todo.id, !todo.finished));
  }

  deleteTodo(todo: TodoModel): void {
    this.store.dispatch(new DeleteTodo(todo.id));
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
