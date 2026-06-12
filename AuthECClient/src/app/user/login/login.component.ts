import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(private http: HttpClient, private service: AuthService, private toastr: ToastrService, private  router : Router) {
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
    if (this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res: any) => {
            localStorage.setItem('token', res.token);
            this.form.reset();
            this.toastr.success("ورود به حساب کاربری با موفقیت انجام شد.");
            this.router.navigateByUrl('/dashboard');
        }, error: (err) => {
          if(err.status == '400')
            this.toastr.error("نام کاربری یا رمز اشتباه است.");
          else
            this.toastr.error("ورود به حساب کاربری با خطا مواجه شد!");
          console.error(err)
        }
      });
    } else {
      this.toastr.warning("لطفا تمام اطلاعات را وارد کنید.");
    }
  }
}
