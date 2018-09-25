import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {BooksComponent} from "./books/books.component";


const appRoutes: Routes = [
    // { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'library', component: BooksComponent },

    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
