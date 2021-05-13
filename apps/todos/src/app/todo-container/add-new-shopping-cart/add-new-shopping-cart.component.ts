import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../store/shoppingcart/actions';
import { ShoppingCartModel } from '../../store/shopping-carts.state';

@Component({
  selector: 'huber-add-new-shopping-cart',
  templateUrl: './add-new-shopping-cart.component.html',
  styleUrls: ['./add-new-shopping-cart.component.css'],
})
export class AddNewShoppingCartComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  categories$: Observable<string[]> = from([]);

  scForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.scForm = this.fb.group({
      name: fb.control('', Validators.required),
      category: fb.control(''),
    });
  }

  ngOnInit(): void {
    this.scForm.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap((data) => console.log('Form status shopping cart: ', data)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onAdd(): void {
    console.log('Form value shopping cart: ', this.scForm.value);
    let newShoppingCart: ShoppingCartModel = {
      id: uuid.v4(),
      name: this.scForm.value.name,
      category: this.scForm.value.category,
      todos: [],
    };
    // TODO dispatch into store
    this.store.dispatch(new ShoppingCart.AddShoppingCart(newShoppingCart));
    this.scForm.markAsUntouched();
    this.scForm.markAsPristine();
    this.scForm.clearValidators();
    this.scForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
