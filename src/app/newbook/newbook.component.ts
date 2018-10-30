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

  constructor(
    private formBuilder: FormBuilder,
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
          this.closeAddModal();
        },
        err => M.toast({html: 'Book Creation Failed.'}), // error
        () => {
          M.toast({html: 'Created book.'});
        } // complete
    );
    // TODO use async features to do this insterad of reload
    location.reload();
  }

  closeAddModal() {
    M.Modal.getInstance(document.getElementById('newBookModal')).close();
  }

}
