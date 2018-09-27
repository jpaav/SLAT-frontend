import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BooksComponent} from './books/books.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { NewbookComponent } from './newbook/newbook.component';
import {AuthenticationService} from './_services/authentication.service';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import {BookApiService} from './_services/book-api.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    LoginComponent,
    NewbookComponent,
    BookdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [
    AuthenticationService,
    BookApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
