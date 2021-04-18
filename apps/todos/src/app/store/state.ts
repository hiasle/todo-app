import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { TodoService } from '../shared/todo.service';
import {
  AddTodo,
  FinishTodo,
  DeleteTodo,
  GetTodos,
  IncreaseAmountTodo,
  DecreaseAmountTodo,
} from './actions';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface TodoModel {
  id: string;
  name: string;
  amount?: number;
  finished: boolean;
}

@State<TodoModel[]>({
  name: 'todoList',
  defaults: [
    /* {
      id: '2',
      name: 'Todo 1',
      finished: false,
    },
    {
      id: '3',
      name: 'Todo 2',
      finished: true,
    },
    {
      id: '4',
      name: 'Todo 3',
      finished: false,
    }, */
  ],
})
@Injectable()
export class TodoListState implements NgxsOnInit {
  constructor(private todoService: TodoService) {}

  ngxsOnInit(ctx: StateContext<TodoModel[]>) {
    console.log('State initialized, now getting animals');
    ctx.dispatch(new GetTodos());
  }

  @Action(GetTodos)
  getTodos(ctx: StateContext<TodoModel[]>) {
    const state = ctx.getState();
    this.todoService
      .fetchTodos()
      .pipe(
        tap((todos) => console.log('Todoservice called fetchTodos: ', todos)),
        map((todo) => ctx.setState([...todo]))
      )
      .subscribe();
  }

  @Action(AddTodo)
  addTodo(ctx: StateContext<TodoModel[]>, action: AddTodo) {
    const state = ctx.getState();
    this.todoService
      .addTodo(action.todo)
      .subscribe(() => ctx.dispatch(new GetTodos()));
    // .subscribe((todos) => ctx.setState([...state, action.todo]));
  }

  @Action(FinishTodo)
  finishTodo(ctx: StateContext<TodoModel[]>, { id, finished }: FinishTodo) {
    const state = ctx.getState();
    let found = state.find((todo) => todo.id === id);
    found = { ...found };
    found.finished = finished;
    this.todoService
      .updateTodo(found, id)
      .subscribe(() => ctx.dispatch(new GetTodos()));
    /* ctx.setState([
      ...state.map((t) =>
        t.id !== id ? t : { id: t.id, name: t.name, finished: finished }
      ),
    ]); */
  }

  @Action(IncreaseAmountTodo)
  increaseAmountTodo(
    ctx: StateContext<TodoModel[]>,
    { id }: IncreaseAmountTodo
  ) {
    const state = ctx.getState();
    const todo = state.find((todo) => todo.id === id);
    const modified = { ...todo, amount: todo.amount ? todo.amount + 1 : 1 };
    this.todoService
      .updateTodo(modified, id)
      .subscribe(() => ctx.dispatch(new GetTodos()));

    /* ctx.setState([
      ...state.map((todo) => {
        if (todo.id === id) {
          let modified = { ...todo };
          modified.amount = todo.amount ? todo.amount + 1 : 1;
          return modified;
        } else {
          return todo;
        }
      }),
    ]); */
  }

  @Action(DecreaseAmountTodo)
  decreaseAmountTodo(
    ctx: StateContext<TodoModel[]>,
    { id }: IncreaseAmountTodo
  ) {
    const state = ctx.getState();
    const todo = state.find((todo) => todo.id === id);
    const modified = { ...todo, amount: todo.amount ? todo.amount - 1 : 0 };
    this.todoService
      .updateTodo(modified, id)
      .subscribe(() => ctx.dispatch(new GetTodos()));

    /* ctx.setState([
      ...state.map((todo) => {
        if (todo.id === id) {
          let modified = { ...todo };
          modified.amount = todo.amount ? todo.amount - 1 : 0;
          return modified;
        } else {
          return todo;
        }
      }),
    ]); */
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoModel[]>, { id }: DeleteTodo) {
    const state = ctx.getState();
    this.todoService
      .deleteTodo(id)
      .subscribe(() =>
        ctx.setState([...state.filter((todo) => todo.id !== id)])
      );
    // ctx.setState([...state.filter((todo) => todo.id !== id)]);
  }
}
