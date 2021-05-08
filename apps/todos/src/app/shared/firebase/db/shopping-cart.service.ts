import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { User } from '../auth/user';
import { ShoppingCartModel } from '../../../store/todos.state';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly dbPath = '/shoppingcarts';
  private readonly shoppingCartRef: AngularFirestoreCollection<ShoppingCartModel> = null;
  private readonly shoppingCartsRef: AngularFirestoreCollection<
    ShoppingCartModel[]
  > = null;

  private readonly collections: AngularFirestoreCollection<ShoppingCartModel[]>;
  private readonly collection: AngularFirestoreCollection<ShoppingCartModel>;

  constructor(public db: AngularFirestore) {
    console.log('Intialize collections');
    /* this.afs
      .collection('users')
      .snapshotChanges()
      .subscribe(() => console.log); */
    this.shoppingCartRef = db.collection(this.dbPath);
    this.shoppingCartsRef = db.collection(this.dbPath);

    this.collections = this.db.collection('shoppingcarts');
    this.collection = this.db.collection('shoppingcarts');
  }

  fetchShoppingCarts(): Observable<any> {
    return this.shoppingCartsRef.snapshotChanges().pipe(
      tap((changes) => console.log('changes from firestore: ', changes)),
      map((changes) =>
        changes.map((c) => {
          console.log(
            `Changes payload: ${JSON.stringify(c.payload.doc)}, id: ${
              c.payload.doc.id
            }, data: ${JSON.stringify(c.payload.doc.data())}`
          );
          return {
            ...c.payload.doc.data(),
            id: c.payload.doc.id,
          };
        })
      )
    );
  }

  fetchUserCollection(): void {
    this.db
      .collection('users')
      .valueChanges()
      .subscribe((data) => console.log('Data retrieved: ', data));
  }

  addShoppingCart(shoppingCart: ShoppingCartModel): Observable<void> {
    return from(this.collection.doc().set(shoppingCart));
  }

  deleteShoppingCart(shoppingCart: ShoppingCartModel): Observable<void> {
    return from(this.shoppingCartsRef.doc(shoppingCart.id).delete());
  }
}
