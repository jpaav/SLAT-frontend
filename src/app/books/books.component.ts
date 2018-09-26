import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {T} from '@angular/core/src/render3';
import * as M from 'materialize-css';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders(
      {'Authorization': localStorage.getItem('Authorization')}
    )
  };

  booksUrl = 'https://slat-backend.herokuapp.com/api/books/';

  books: Book[];

  constructor(
  private http: HttpClient) { }

  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl, this.httpOptions)
      .pipe(
        tap(books => M.toast({html: 'Fetched books'})),
        catchError(this.handleError('getBooks', []))
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
      M.toast({html: 'Getting books from server failed.'});
      return of(result as T);
    };
  }

  ngOnInit() {
    this.getBooks().subscribe( books => {
      this.books = books;
    });
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.fixed-action-btn');
      M.FloatingActionButton.init(elems);
    });
  }

  openAddModal() {
    M.Modal.getInstance(document.getElementById('newBookModal')).open();
  }
}
