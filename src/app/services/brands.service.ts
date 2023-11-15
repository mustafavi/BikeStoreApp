import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IBrands } from '../interfaces/IBrands';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
 // private brandsUrl: string = '/assets/data/brands.json'


 constructor(private http: HttpClient) {}



  //private storesUrl: string = 'assets/data/stores.json'
  private storeUrl: string = 'http://localhost:8080/brand';



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


brands$ = this.http.get<IBrands[]>(`${this.storeUrl}`)
.pipe(
  tap(data => console.log(`All ${JSON.stringify(data)}`)),
  catchError(this.handleError)
)






  getBrands(): Observable<IBrands[]> {
    return this.http.get<IBrands[]>(this.storeUrl).pipe(
      tap(data => console.log(`All ${JSON.stringify(data)}`)),
      catchError(this.handleError)
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
