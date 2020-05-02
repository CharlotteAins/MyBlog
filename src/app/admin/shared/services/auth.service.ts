import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FBAuthResponse, User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.APIKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    this.error$.next(message.replace(/_/g, ' '));
    return throwError(error);
  }

  private setToken(response: FBAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + (parseInt(response.expiresIn) * 1000));
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());

      if(response.email === 'pyshist4@gmail.com') {
        localStorage.setItem('author', 'Charlotte Ainsworth');
      }

      if(response.email === 'maxim.mephistos@gmail.com') {
        localStorage.setItem('author', 'Maxim ˈLiːbrə Pavlenko');
      }

    } else {
      localStorage.clear();
    }
  }

}
