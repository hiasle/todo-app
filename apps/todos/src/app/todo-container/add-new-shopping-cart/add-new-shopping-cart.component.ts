import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { ShoppingCartModel } from '../../store/todos.state';
import * as uuid from 'uuid';
import { Select, Store } from '@ngxs/store';
import { AddShoppingCart } from '../../store/shoppingcart/actions';
import { FavoritesState } from '../../store/favorites.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'huber-add-new-shopping-cart',
  templateUrl: './add-new-shopping-cart.component.html',
  styleUrls: ['./add-new-shopping-cart.component.css'],
})
export class AddNewShoppingCartComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Select(FavoritesState.categories) categories$: Observable<string[]>;

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
    this.store.dispatch(new AddShoppingCart(newShoppingCart));
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
