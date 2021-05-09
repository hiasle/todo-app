import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { FavoritesModel } from '../../../store/favorites.state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly dbPath = '/tags';
  private readonly tagsRef: AngularFirestoreCollection<FavoritesModel[]>;
  private readonly tagRef: AngularFirestoreCollection<FavoritesModel>;

  constructor(public db: AngularFirestore) {
    this.tagRef = db.collection(this.dbPath);
    this.tagsRef = db.collection(this.dbPath);
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
}
