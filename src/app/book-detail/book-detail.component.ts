import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../book';
import {Transaction} from '../transaction';
import * as M from 'materialize-css';
import {BookApiService} from '../_services/book-api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  loading: boolean;
  transaction: Transaction;
  qr_type = 'url';
  qr_value = this.getQrUrl();
  constructor(private api: BookApiService) { }

  ngOnInit() {
  }

  getLatestTransaction() {
    if (this.book == null) {
      M.toast({html: 'book is null'});
    }
    this.loading = true;
    this.api.getTransactions(this.book.id).subscribe( (transactions) => {
        this.transaction =  transactions[0];
        this.loading = false;
      },
      () => M.toast({html: 'Getting most recent transaction failed'})
    );
    return this.transaction;
  }

  getQrUrl(): String {
    let url = 'https://slat-backend.herokuapp.com/api/';
    if (this.book != null) {
      url += 'book/' + this.book.id.toString();
    } else {
      url += 'books/';
    }
    return url;
  }

}
