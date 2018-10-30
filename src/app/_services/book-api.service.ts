import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs/index';
import * as M from 'materialize-css';
import {catchError, tap} from 'rxjs/operators';
import {Book} from '../book';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  httpOptions = {
    headers: new HttpHeaders(
      {'Authorization': localStorage.getItem('Authorization')}
    )
  };
  apiUrl = 'https://slat-backend.herokuapp.com/api/';
  booksUrl = this.apiUrl + 'books/';
  createBookChange: Subject<string> = new Subject<string>();


  constructor(private http: HttpClient) { }

  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError('getBooks', []))
      );
  }

  getIsCheckedOut (pk): Observable<boolean> {
    return this.http.get<boolean>(this.getIsCheckedOutString(pk), this.httpOptions)
      .pipe(
        catchError(this.handleError('getIsCheckedOut', null))
      );
  }

  createBook (title: string, authors: string, year: string, edition: string): Observable<Book> {
    this.createBookChange.next();
    return this.http.post<Book>(this.booksUrl, {'title': title, 'authors': authors, 'year': year, 'edition': edition}, this.httpOptions)
      .pipe(
        catchError(this.handleError('createBook', null))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // if (operation === 'getBooks') {
      //   M.toast({html: 'Getting books from server failed.'});
      // }
      return of(result as T);
    };
  }

  getIsCheckedOutString(pk) {
    return this.apiUrl + 'book/' + pk.toString() + '/checkedOut';
  }

}
