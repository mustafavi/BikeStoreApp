import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JsonFormData } from 'src/app/components/jsonform/json-form/json-form.component';
import { IBrands } from 'src/app/interfaces/IBrands';
import { ICategory } from 'src/app/interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class JsonFormService implements OnInit {

  //private storeUrl: string = 'http://localhost:8080/categories';
  // private productUrl = 'assets/products/products.json';
  private jsonFormUrl: string = 'assets/my-form.json';
  private storeUrl: string = 'http://localhost:8080/categories';
  public myformData: JsonFormData | undefined;

  constructor(private http: HttpClient) {}


  ngOnInit(): void {

  }


  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.storeUrl}`)
      .pipe(
        tap(data => console.log(`All ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      )
  }



PrintMyName(name:string):void{
  console.log(`Before calling this.getControls(); ${name}`);
this.getControls();

console.log(`after calling this.getControls(); ${name}`);

}



  getControls(): Observable<JsonFormData[]> {
    return this.http.get<JsonFormData[]>(`${this.jsonFormUrl}`)
      .pipe(
        tap(data => console.log(`All ${JSON.stringify(data)}`)),
        tap(dd => console.log('test')),
        catchError(this.handleError)
      )
  }


  // jsonForm$ = this.http.get<JsonFormData[]>(this.jsonFormUrl)
  //   .pipe(
  //     tap(data => console.log(data)),
  //     catchError(this.handleError)
  //   );


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
