import {Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css']
})
export class NewbookComponent implements OnInit {
  newBookForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
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
    // M.toast({html: this.f.title});
    console.log(this.f);
  }


  closeAddModal() {
    M.Modal.getInstance(document.getElementById('newBookModal')).close();
  }
}
