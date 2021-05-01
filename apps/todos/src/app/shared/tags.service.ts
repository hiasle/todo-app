import { TagsModel } from './../store/tags.state';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoModel } from '../store/state';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  tagsUrl = 'http://localhost:3000/tags/';

  fetchTags(): Observable<TagsModel[]> {
    return this.http.get<TagsModel[]>(this.tagsUrl);
  }

  /* deleteTag(id: string): Observable<any> {
    return this.http.delete(this.tagsUrl + id);
  } */

  addTag(payload: TagsModel): Observable<TagsModel> {
    return this.http.post<TagsModel>(this.tagsUrl, payload);
  }

  // updateTodo(payload: string, id: string): Observable<string> {
  //   return this.http.put<TodoModel>(this.todoUrl + id, payload);
  // }
}
