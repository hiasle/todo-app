import { TagsService } from './../shared/tags.service';
import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { TodoService } from '../shared/todo.service';
import {
  AddTodo,
  FinishTodo,
  DeleteTodo,
  GetTodos,
  IncreaseAmountTodo,
  DecreaseAmountTodo,
  GetTags,
} from './actions';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TodoModel {
  id: string;
  name: string;
  amount?: number;
  finished: boolean;
}

@State<TodoModel[]>({
  name: 'todoList',
  defaults: [],
})
@Injectable()
export class TodoListState implements NgxsOnInit {
  constructor(private todoService: TodoService) {}

  ngxsOnInit(ctx: StateContext<TodoModel[]>) {
    console.log('State initialized, now getting animals');
    ctx.dispatch(new GetTodos());
  }

  @Action(GetTodos)
  getTodos(ctx: StateContext<TodoModel[]>): Observable<TodoModel[]> {
    const state = ctx.getState();
    return this.todoService.fetchTodos().pipe(
      tap((todos) => console.log('Todoservice called fetchTodos: ', todos)),
      map((todo) => ctx.setState([...todo]))
    );
  }

  @Action(AddTodo)
  addTodo(
    ctx: StateContext<TodoModel[]>,
    action: AddTodo
  ): Observable<TodoModel[]> {
    const state = ctx.getState();
    return this.todoService
      .addTodo(action.todo)
      .pipe(tap(() => ctx.dispatch(new GetTodos())));
  }

  @Action(FinishTodo)
  finishTodo(
    ctx: StateContext<TodoModel[]>,
    { id, finished }: FinishTodo
  ): Observable<TodoModel[] | TodoModel> {
    const state = ctx.getState();
    let found = state.find((todo) => todo.id === id);
    found = { ...found };
    found.finished = finished;
    return this.todoService
      .updateTodo(found, id)
      .pipe(tap(() => ctx.dispatch(new GetTodos())));
  }

  @Action(IncreaseAmountTodo)
  increaseAmountTodo(
    ctx: StateContext<TodoModel[]>,
    { id }: IncreaseAmountTodo
  ): Observable<TodoModel> {
    const state = ctx.getState();
    const todo = state.find((todo) => todo.id === id);
    const modified = { ...todo, amount: todo.amount ? todo.amount + 1 : 1 };
    return this.todoService.updateTodo(modified, id).pipe(
      tap((todo) => console.log('Increase amount: ', todo)),
      tap(() => ctx.dispatch(new GetTodos()))
    );
  }

  @Action(DecreaseAmountTodo)
  decreaseAmountTodo(
    ctx: StateContext<TodoModel[]>,
    { id }: IncreaseAmountTodo
  ): Observable<TodoModel> {
    const state = ctx.getState();
    const todo = state.find((todo) => todo.id === id);
    const modified = { ...todo, amount: todo.amount ? todo.amount - 1 : 0 };
    return this.todoService.updateTodo(modified, id).pipe(
      tap((todo) => console.log('Decrease amount: ', todo)),
      tap(() => ctx.dispatch(new GetTodos()))
    );
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoModel[]>, { id }: DeleteTodo) {
    const state = ctx.getState();
    return this.todoService
      .deleteTodo(id)
      .pipe(
        tap(() => ctx.setState([...state.filter((todo) => todo.id !== id)]))
      );
  }
}
