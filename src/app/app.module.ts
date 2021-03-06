import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BooksComponent} from './books/books.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from './routing.module';
import {HttpClientModule} from '@angular/common/http';
import { NewbookComponent } from './newbook/newbook.component';
import {AuthenticationService} from './_services/authentication.service';
import {BookApiService} from './_services/book-api.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    LoginComponent,
    NewbookComponent,
    BookDetailComponent,
    NewTransactionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    routing,
  ],
  providers: [
    AuthenticationService,
    BookApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
