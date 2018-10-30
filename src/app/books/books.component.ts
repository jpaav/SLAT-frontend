import {Component, OnChanges, OnInit} from '@angular/core';
import {Book} from '../book';
import * as M from 'materialize-css';
import {BookApiService} from '../_services/book-api.service';
import {NewbookComponent} from '../newbook/newbook.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  loading = false;
  showUpdateBtn = false;
  books: Book[];
  bookSelection: Book;

  constructor(
    private api: BookApiService) {
    api.createBookChange.subscribe(() => {
      this.showUpdateBtn = true;
    });
  }

  ngOnInit() {
    this.getBooks();
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.fixed-action-btn');
      M.FloatingActionButton.init(elems);
    });
  }

  getBooks() {
    this.showUpdateBtn = false;
    this.loading = true;
    this.api.getBooks().subscribe((books) => {
        this.books = books;
        this.loading = false;
      },
      () => M.toast({html: 'Fetching books failed'}),
      () => M.toast({html: 'Fetched books'})
    );
  }

  openAddModal() {
    M.Modal.getInstance(document.getElementById('newBookModal')).open();
  }

  openTransactionModal(book: Book) {
    this.bookSelection = book;
    M.Modal.getInstance(document.getElementById('newTransactionModal')).open();
  }

  openDetailModal(book: Book) {
    this.bookSelection = book;
    M.Modal.getInstance(document.getElementById('detailBookModal')).open();
  }
}
