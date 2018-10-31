import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs/index';
import * as M from 'materialize-css';
import {catchError, tap} from 'rxjs/operators';
import {Book} from '../book';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Transaction} from '../transaction';

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

  getTransactionsUrl(book_pk: number): string {
    return this.apiUrl + 'book/' + book_pk.toString() + '/transactions/';
  }

  getTransactionUrl(book_pk: number, transaction_pk: number): string {
    return this.apiUrl + 'book/' + book_pk.toString() + '/transaction/' + transaction_pk.toString() + '/';
  }

  getBookUrl(book_pk: number): string {
    return this.apiUrl + 'book/' + book_pk.toString() + '/';
  }

  getIsCheckedOutUrl(book_pk: number) {
    return this.apiUrl + 'book/' + book_pk.toString() + '/checkedOut/';
  }

  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError('getBooks', []))
      );
  }

  getIsCheckedOut (pk): Observable<boolean> {
    return this.http.get<boolean>(this.getIsCheckedOutUrl(pk), this.httpOptions)
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

  createTransaction (book_pk: number, first_name: string, last_name: string): Observable<Transaction> {
    return this.http.post<Transaction>(this.getTransactionsUrl(book_pk), {'first_name': first_name, 'last_name': last_name}, this.httpOptions)
      .pipe(
        catchError(this.handleError('createTransaction', null))
      );
  }

  getTransactions (book_pk: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.getBookUrl(book_pk), this.httpOptions)
      .pipe(
        catchError(this.handleError('getLatestTransaction', []))
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

}
