import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import * as uuid from 'uuid';
import { ErrorStateMatcher } from '@angular/material/core';
import { TodoModel } from '../../store/state';
import { Select, Store } from '@ngxs/store';
import { TagsState } from '../../store/tags.state';
import { Observable } from 'rxjs';
import { FavoritesState } from '../../store/favorites.state';
import { ShoppingCartModel } from '../../store/todos.state';
import { ShoppingCart } from '../../store/shoppingcart/actions';

@Component({
  selector: 'huber-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  @Select(FavoritesState.categories) tagNames$: Observable<string[]>;

  @Input()
  shoppingCart: ShoppingCartModel;

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = fb.group({
      name: fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    console.log('Form status: ', this.todoForm.status);
    let newTodo: TodoModel = {
      id: uuid.v4(),
      name: this.todoForm.value.name,
      finished: false,
    };
    const shoppingCartCopy = {
      ...this.shoppingCart,
      todos: [...this.shoppingCart.todos, newTodo],
    };
    this.store.dispatch(new ShoppingCart.UpdateShoppingCart(shoppingCartCopy));
    this.todoForm.reset();
    this.todoForm.markAsUntouched();
  }

  get name(): FormControl {
    return this.todoForm.controls['name'] as FormControl;
  }

  get errorMatcher(): ErrorStateMatcher {
    return new TouchedErrorStateMatcher();
  }
}

class TouchedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}