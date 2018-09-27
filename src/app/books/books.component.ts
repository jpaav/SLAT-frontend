import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {T} from '@angular/core/src/render3';
import * as M from 'materialize-css';
import {BookApiService} from '../_services/book-api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  loading = false;
  books: Book[];

  constructor(
  private api: BookApiService) { }


  ngOnInit() {
    this.loading = true;
    this.api.getBooks().subscribe( (books) => {
      this.books = books;
      this.loading = false;
    },
      () => M.toast({html: 'Fetching books failed'}),
      () => M.toast({html: 'Fetched books'})
      );
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.fixed-action-btn');
      M.FloatingActionButton.init(elems);
    });
  }

  openAddModal() {
    M.Modal.getInstance(document.getElementById('newBookModal')).open();
  }
}
