import { TagsState, TagsModel } from './store/tags.state';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'huber-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Select(TagsState) tags$: Observable<TagsModel[]>;
}
