import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavoritesModel, FavoritesState } from '../store/favorites.state';

@Component({
  selector: 'huber-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  @Select(FavoritesState.categories) categories$: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {}
}
