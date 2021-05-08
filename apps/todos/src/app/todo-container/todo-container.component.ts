import { TagsState } from './../store/tags.state';
import { AddTodo } from './../store/actions';
import { TodoListState, TodoModel } from './../store/state';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import * as uuid from 'uuid';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShoppingCartModel, ShoppingListState } from '../store/todos.state';
import { DeleteShoppingCart } from '../store/shoppingcart/actions';

@Component({
  selector: 'huber-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoContainerComponent implements OnInit {
  @Select(ShoppingListState) shoppingcarts$: Observable<ShoppingCartModel[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  deleteShoppingCart(shoppingCart: ShoppingCartModel) {
    this.store.dispatch(new DeleteShoppingCart(shoppingCart));
  }
}
