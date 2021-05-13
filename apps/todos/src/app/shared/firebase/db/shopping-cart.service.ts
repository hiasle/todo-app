import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ShoppingCartModel } from '../../../store/shopping-carts.state';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly dbPath = '/shoppingcarts';
  private readonly shoppingCartRef: AngularFirestoreCollection<ShoppingCartModel> = null;
  private readonly shoppingCartsRef: AngularFirestoreCollection<
    ShoppingCartModel[]
  > = null;

  constructor(public db: AngularFirestore) {
    this.shoppingCartRef = db.collection(this.dbPath);
    this.shoppingCartsRef = db.collection(this.dbPath);
  }

  fetchShoppingCarts(): Observable<any> {
    return this.shoppingCartsRef.snapshotChanges().pipe(
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

  fetchUserCollection(): void {
    this.db
      .collection('users')
      .valueChanges()
      .subscribe((data) => console.log('Data retrieved: ', data));
  }

  addShoppingCart(shoppingCart: ShoppingCartModel): Observable<void> {
    return from(this.shoppingCartRef.doc().set(shoppingCart));
  }

  deleteShoppingCart(shoppingCart: ShoppingCartModel): Observable<void> {
    return from(this.shoppingCartsRef.doc(shoppingCart.id).delete());
  }

  updateShoppingCart(shoppingCart: ShoppingCartModel): Observable<void> {
    return from(this.shoppingCartRef.doc(shoppingCart.id).update(shoppingCart));
  }
}
