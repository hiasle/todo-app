import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(public afs: AngularFirestore) {
    console.log('Intialize collections');
    this.afs
      .collection('users')
      .snapshotChanges()
      .subscribe(() => console.log);
  }

  fetchUserCollection(): void {
    this.afs
      .collection('users')
      .valueChanges()
      .subscribe((data) => console.log('Data retrieved: ', data));
  }
}
