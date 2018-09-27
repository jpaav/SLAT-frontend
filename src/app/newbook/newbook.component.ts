import {Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, map, tap, timeout} from 'rxjs/operators';
import {Book} from '../book';
import {Observable, of} from 'rxjs/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BookApiService} from '../_services/book-api.service';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewbookComponent implements OnInit {
  newBookForm: FormGroup;
  submitted = false;
  loading = false;
  bookUrl = 'http://slat-backend.herokuapp.com/api/books/';
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': localStorage.getItem('Authorization'),
      }
    )
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private api: BookApiService) {
  }

  ngOnInit() {
    // Create modal
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.modal');
      M.Modal.init(elems);
    });
    this.newBookForm = this.formBuilder.group( {
      title: ['', Validators.required],
      authors: ['', Validators.required],
      year: ['', Validators.required],
      edition: ['', Validators.required],
    });
  }

  get f() {
    return this.newBookForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // M.toast({html: this.f.title});
    this.api.createBook(this.f.title.value, this.f.authors.value, this.f.year.value, this.f.edition.value)
      .subscribe(
        (res) => {
          this.loading = false;
        },
        err => M.toast({html: 'Book Creation Failed.'}), // error
        () => M.toast({html: 'Created book.'}) // complete
    );
  }

  closeAddModal() {
    M.Modal.getInstance(document.getElementById('newBookModal')).close();
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
      M.toast({html: 'Error creating book'});
      return of(result as T);
    };
  }

}
