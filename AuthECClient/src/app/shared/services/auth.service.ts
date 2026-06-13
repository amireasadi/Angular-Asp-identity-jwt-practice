import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TOKEN_KEY} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:5216/api";

  constructor(private http: HttpClient) {
  }

  CreateUser(formData: any) {
    return this.http.post(this.baseUrl + '/signup', formData);
  }

  signin(formData: any) {
    return this.http.post(this.baseUrl + '/signin', formData);
  }

  isLoggedIn()
  {
    return localStorage.getItem(TOKEN_KEY) != null;
  }

  deleteToken()
  {
    localStorage.removeItem(TOKEN_KEY);
  }
  setToken(token: string)
  {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
