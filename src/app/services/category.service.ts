import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Category } from '../components/categories/category';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private storesUrl: string = 'assets/data/stores.json'
  private storeUrl: string = 'http://localhost:8080/categories';



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

categories$ = this.http.get<ICategory[]>(`${this.storeUrl}`)
.pipe(
  tap(data => console.log(`All ${JSON.stringify(data)}`)),
  catchError(this.handleError)
)

/*
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.storeUrl}`)
      .pipe(
        tap(data => console.log(`All ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      )
  }
*/
  getCategory(id:number): Observable<ICategory | undefined> {
    //return this.getCategories()
    return this.categories$
      .pipe(
        map((categories:ICategory[]) => categories.find(c => c.category_id === id)),
      //tap((categories:ICategories[]) => categories.find(c => c.category_id === id))
      //catchError(this.handleError)
      )
  }

/**
 *
 * createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<Product>(this.productsUrl, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

 */
createCategory(category: ICategory):Observable<ICategory> {
//console.log('Im here ',category);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //newCategory?.category_id = null;

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // product.id = null;

    return this.http.post<ICategory>(this.storeUrl, category, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  //return this.http.post<ICategories>()
  //newCategory = newCategory;


  constructor(private http: HttpClient) { }

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
