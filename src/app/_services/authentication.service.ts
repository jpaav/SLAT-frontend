import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  url = 'https://slat-backend.herokuapp.com/api-token-auth/';
  // url = 'http://127.0.0.1:8000/api-token-auth/';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.url, {username: username, password: password})
      .pipe(map((res: Response) => {
        // login successful if there's a jwt token in the response
        if (res['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('Authorization', 'Token ' + res['token']);
        }
        return res;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('Authorization');
  }

  loggedIn() {
    return (localStorage.getItem('Authorization') != null);
  }
}
