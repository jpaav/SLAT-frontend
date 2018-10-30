import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookApiService} from '../_services/book-api.service';
import * as M from 'materialize-css';
import {Book} from '../book';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm: FormGroup;
  curBook: Book;
  isCheckedOut: boolean;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private api: BookApiService) {
  }

  ngOnInit() {
    // Create modal
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.modal');
      M.Modal.init(elems);
    });
    this.newTransactionForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
    this.loading = true;
    this.api.getIsCheckedOut(this.curBook.id).subscribe((bool) => {
        this.isCheckedOut = bool;
        this.loading = false;
      },
      () => M.toast({html: 'Checking if the book was checked out failed'})
    );
  }

  closeTransactionModal() {
    M.Modal.getInstance(document.getElementById('newTransactionModal')).close();

  }

  onSubmit() {

    // TODO use async features to do this insterad of reload
    location.reload();
  }

}
