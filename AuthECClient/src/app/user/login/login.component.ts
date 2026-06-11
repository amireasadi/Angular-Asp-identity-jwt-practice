import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private http : HttpClient, private service : AuthService) {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  getControl(name: string) {
    return this.form.get(name);
  }

  isInvalid(name: string): boolean {
    const control = this.getControl(name);
    return !!(control?.invalid && control?.touched );
  }
  onSubmit(){
    console.log(this.form.value)
  }
}
