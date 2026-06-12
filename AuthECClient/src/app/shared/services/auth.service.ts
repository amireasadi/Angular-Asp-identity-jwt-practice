import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
}
