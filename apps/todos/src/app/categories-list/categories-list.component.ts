import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TagsService } from '../shared/firebase/db/tags.service';
import { FavoritesModel, FavoritesState } from '../store/favorites.state';

@Component({
  selector: 'huber-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  @Select(FavoritesState) favState$: Observable<FavoritesModel[]>;
  @Select(FavoritesState.categories) categories$: Observable<string[]>;

  constructor(private tagService: TagsService) {}

  ngOnInit(): void {
    console.log(this.favState$.subscribe(() => console.log));
    console.log(this.categories$.subscribe(() => console.log));
    this.tagService
      .fetchAllTags()
      .subscribe((data) => console.log('All tags fetched: ', data));
  }
}
