import {
  Component,
  OnInit,
  OnDestroy,
  importProvidersFrom,
} from '@angular/core';
import {
  catchError,
  EMPTY,
  filter,
  map,
  observable,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  // implements OnInit, OnDestroy {
  pageTitle: string = 'Available bikes';
  errrorMessage: string = '';
  filteredProductsCounter: number = 0;
  totalProducts: number = 0;
  //sub!: Subscription;

  private _listFilter: string = '';
  //  products: IProduct[] = [];

  products$ = this.productService.productsWithCategory$.pipe(
    map((products) =>
      products.map(
        (product) =>
          ({
            ...product,
            list_price: product.list_price ? product.list_price * 1.4 : 0,
            //searchKey:  [product.product_name]
          } as IProduct)
      )
    ),

    tap((data) => (this.totalProducts = data.length)),
    catchError((err) => {
      this.errrorMessage = err;
      return EMPTY;
    })
  );

  filteredProducts$ = this.products$;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    //  this.filteredProducts$(value);// = this.performSearch(value);
    //this.counter = this.filteredProducts.length;

    this.filteredProducts$ = this.products$.pipe(
      map((products) =>
        products.filter((product) =>
          product.product_name
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        )
      ),
      //tap(data => console.log(`Total Products: ${data.length}`)),

      //        tap(data => this.counter = data.length),
      //tap(data => this.counter = 300),

      catchError((err) => {
        this.errrorMessage = err;
        return EMPTY;
      })
    );

    this.filteredProducts$.subscribe(
      (x) => (this.filteredProductsCounter = x.length)
    );
  }

  constructor(private productService: ProductService) {}

  /*

    filteredProducts: IProduct[] = [];

    performSearch(filterBy: string): Observable<IProduct[]> {
      filterBy = filterBy.toLocaleLowerCase();
     return this.products$.pipe(
        map(products => products.filter(item => item.product_name.toLocaleLowerCase().includes(filterBy))))
     }
     example():void{
      let sum = (x: number, y: number): number => {  return x + y;}}
      //sum(10, 20); //returns 30
  */

  /*
  private items: Observable<Item[]>;
  this.itemObservable.pipe (
     map(items => items.filter(item => item.name.toLowerCase().indexOf(query) > -1)) )
  */

  exampleFilter(fitlerBy: string): void {
    this.products$.pipe(
      map((items) =>
        items.filter((item) =>
          item.product_name.toLocaleLowerCase().includes(fitlerBy)
        )
      )
    );
  }
}
