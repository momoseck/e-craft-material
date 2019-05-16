import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compte } from 'src/app/models/Compte';
import { Observable } from 'rxjs';
// import { JwtHelper } from '@auth0/angular-jwt';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

const API_URI = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // tslint:disable-next-line:ban-types
  host: String = API_URI;
  APPCOMPTE = null;
  header: any;
  private jwtToken: string = null;
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({ 'authorization': this.getToken() });
  }
  loginUser(user: Compte) {

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
  logOut() {
    this.jwtToken = null;
    this.APPCOMPTE = null;
    localStorage.clear();
  }
  load() {
    //
    const token = this.getToken();
    if (token !== null) {
      const decodedJwtJsonData = window.atob(token.split('.')[1]);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      //
      return this.http.get<Compte>(this.host + 'user/' + decodedJwtData.sub, { headers: this.header });
    }
    return null;
  }
  loadUser() {

    if (this.load() !== null) {

      this.load().subscribe(
        response => {
          return this.APPCOMPTE = response;

        }, err => {

        }
      );
    } else {
      return null;
    }
  }
  hasToken(): boolean {
    return this.getToken() !== null;
  }
}
