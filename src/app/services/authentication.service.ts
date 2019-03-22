import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compte } from 'src/app/models/Compte';
import { Observable } from 'rxjs';
// import { JwtHelper } from '@auth0/angular-jwt';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // tslint:disable-next-line:ban-types
  host: String = 'http://localhost:8080/';
  private jwtToken: string = null;
  constructor(private http: HttpClient) { }
  loginUser(user: User) {
    return this.http.post<Compte>(this.host + 'login', user, { observe: 'response' });
  }
  saveToken(token: string) {
    this.jwtToken = token;
    localStorage.setItem('token', token);
  }
  loadToken() {
    if (this.jwtToken == null) {
      this.jwtToken = localStorage.getItem('token');
    }
  }
  getToken() {
    this.loadToken();
    return this.jwtToken;
  }
}
