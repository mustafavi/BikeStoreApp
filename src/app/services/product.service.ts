import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, combineLatest, filter, forkJoin, map, merge, Observable, of, scan, shareReplay, Subject, switchMap, tap, throwError } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { BrandsService } from './brands.service';
import { CategoryService } from './category.service';





@Injectable({
  providedIn: 'root'
})
export class ProductService {


  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  //private productUrl = 'api/products/products.json';
  private productUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient,
    private categoryServcice:CategoryService,
    private brandService:BrandsService) { }

  products$ = this.http.get<IProduct[]>(this.productUrl)
    .pipe(
      //tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );



productsWithCategory$ = combineLatest([
  this.products$,
  this.categoryServcice.categories$,
  this.brandService.brands$
])
.pipe(
map(([products, categories, brands]) =>
  products.map(product  => ({
    ...product,
    list_price: product.list_price? 1.5* product.list_price : 0,
    brand:brands.find(b => b.brand_id === product.brand_id)?.brand_name,
    category: categories.find(c => c.category_id === product.category_id)?.category_name,

    searchKey:[product.product_name]
  }as IProduct))
)
);


  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one product
  // Since we are working with a json file, we can only retrieve all products
  // So retrieve all products and then find the one we want using 'map'
  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.product_id === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }



}
