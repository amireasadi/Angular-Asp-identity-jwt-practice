import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TOKEN_KEY} from "../constants";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  CreateUser(formData: any) {
    return this.http.post(environment.baseUrl + '/signup', formData);
  }

  signin(formData: any) {
    return this.http.post(environment.baseUrl + '/signin', formData);
  }

  isLoggedIn()
  {
    return this.getToken() != null;
  }

  deleteToken()
  {
    localStorage.removeItem(TOKEN_KEY);
  }
  setToken(token: string)
  {
    localStorage.setItem(TOKEN_KEY, token);
  }
  getToken(){
    return localStorage.getItem(TOKEN_KEY);
  }
}
