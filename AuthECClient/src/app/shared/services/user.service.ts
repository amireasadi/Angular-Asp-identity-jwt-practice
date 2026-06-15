import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService : AuthService) {
  }

  getUserProfile()
  {
    const reqHeader = new HttpHeaders({'Authorization': `Bearer ${this.authService.getToken()}`})
    return this.http.get(environment.baseUrl + '/userprofile', {headers: reqHeader});
  }
}
