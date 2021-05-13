import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TagsService } from '../shared/firebase/db/tags.service';

@Component({
  selector: 'huber-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  constructor(private tagService: TagsService) {}

  ngOnInit(): void {}
}
