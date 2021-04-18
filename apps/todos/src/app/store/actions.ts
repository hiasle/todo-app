import { TodoModel } from './state';

export class GetTodos {
  static readonly type = '[Todo List] Get Todos';
}

export class AddTodo {
  static readonly type = '[Todo List] Add Todo';
  constructor(public todo: TodoModel) {}
}

export class FinishTodo {
  static readonly type = '[Todo List] Finish Todo';
  constructor(public id: string, public finished: boolean) {}
}

export class IncreaseAmountTodo {
  static readonly type = '[Todo List] Increase Amount Todo';
  constructor(public id: string) {}
}

export class DecreaseAmountTodo {
  static readonly type = '[Todo List] Decrease Amount Todo';
  constructor(public id: string) {}
}

export class DeleteTodo {
  static readonly type = '[Todo List] Delete Todo';
  constructor(public id: string) {}
}
