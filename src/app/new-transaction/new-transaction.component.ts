import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookApiService} from '../_services/book-api.service';
import * as M from 'materialize-css';
import {Book} from '../book';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm: FormGroup;
  @Input() curBook: Book;
  isCheckedOut: boolean;
  loading = false;
  transaction: Transaction;

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
  }

  closeTransactionModal() {
    M.Modal.getInstance(document.getElementById('newTransactionModal')).close();
  }

  openTransactionModal() {
    M.Modal.getInstance(document.getElementById('newTransactionModal')).open();
    this.getLatestTransaction();
  }

  getIsCheckedOut() {
    if (this.curBook == null) {
      M.toast({html: 'curBook is null'});
    }
    this.loading = true;
    this.api.getIsCheckedOut(this.curBook.id).subscribe((bool) => {
        this.isCheckedOut = bool;
        this.loading = false;
      },
      () => M.toast({html: 'Checking if the book was checked out failed'})
    );
    return this.isCheckedOut;
  }

  getLatestTransaction() {
    if (this.curBook == null) {
      M.toast({html: 'curBook is null'});
    }
    this.loading = true;
    this.api.getTransactions(this.curBook.id).subscribe( (transactions) => {
      this.transaction =  transactions[0];
      this.loading = false;
      },
      () => M.toast({html: 'Getting most recent transaction failed'})
    );
    return this.transaction;
  }

  onSubmit() {
    if (!this.getIsCheckedOut()) {
      M.toast({html: 'This book is already checked out'});
      location.reload();
    }
    if (this.newTransactionForm.invalid) {
      if (this.newTransactionForm.controls.first_name.errors.required) {
        M.toast({html: 'First name is required'});
      }
      if (this.newTransactionForm.controls.last_name.errors.required) {
        M.toast({html: 'Last name is required'});
      }
      return;
    }

    this.loading = true;
    this.api.createTransaction(this.curBook.id, this.newTransactionForm.controls.first_name.value, this.newTransactionForm.controls.last_name.value)
      .subscribe((transaction) => {
        this.transaction = transaction;
        this.loading = false;
      }
    );
    // TODO use async features to do this insterad of reload
    location.reload();
    this.openTransactionModal();
  }

}
