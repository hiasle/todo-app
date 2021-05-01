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

@Component({
  selector: 'huber-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoContainerComponent implements OnInit {
  @Select(TodoListState) todos$: Observable<TodoModel[]>;
  @Select(TodoListState) todos2$: Observable<TodoModel[]>;
  @Select(TagsState.tagNames) tagNames$: Observable<string[]>;

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = fb.group({
      name: fb.control('', [Validators.required]),
    });
  }

  get name(): FormControl {
    return this.todoForm.controls['name'] as FormControl;
  }

  get errorMatcher(): ErrorStateMatcher {
    return new TouchedErrorStateMatcher();
  }

  ngOnInit(): void {}

  onSave(): void {
    console.log('Form status: ', this.todoForm.status);
    let newTodo: TodoModel = {
      id: uuid.v4(),
      name: this.todoForm.value.name,
      finished: false,
    };
    this.store.dispatch(new AddTodo(newTodo));
    this.todoForm.reset();
    this.todoForm.markAsUntouched();
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
