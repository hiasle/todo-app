import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TagsModel } from '../../../store/tags.state';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly dbPath = '/tags';
  private readonly tagsRef: AngularFirestoreCollection<TagsModel[]>;
  private readonly tagRef: AngularFirestoreCollection<TagsModel>;

  tags: TagsModel[];

  constructor(public db: AngularFirestore) {
    this.tagRef = db.collection(this.dbPath);
    this.tagsRef = db.collection(this.dbPath);
    this.tagRef.valueChanges().subscribe((t) => (this.tags = t));
  }

  fetchAllTags(): Observable<any> {
    return this.tagsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          return {
            ...c.payload.doc.data(),
            id: c.payload.doc.id,
          };
        })
      )
    );
  }

  addTag(tag: TagsModel): Observable<void> {
    console.log('Tags stored in service: ', this.tags);
    return from(this.tagRef.doc().set(tag));
  }
}
