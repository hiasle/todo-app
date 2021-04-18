import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoModel } from '../store/state';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  todoUrl = 'http://localhost:3000/todos/';

  fetchTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.todoUrl);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(this.todoUrl + id);
  }

  addTodo(payload: TodoModel): Observable<TodoModel[]> {
    return this.http.post<TodoModel[]>(this.todoUrl, payload);
  }

  updateTodo(payload: TodoModel, id: string): Observable<TodoModel> {
    return this.http.put<TodoModel>(this.todoUrl + id, payload);
  }
}
