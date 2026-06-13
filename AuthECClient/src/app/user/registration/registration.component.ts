import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration', standalone: true, imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent implements OnInit{
  constructor(private service: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    if(this.service.isLoggedIn())
      this.router.navigateByUrl('dashboard');
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value != confirmPassword.value) confirmPassword.setErrors({passwordMismatch: true}); else confirmPassword?.setErrors(null);

    return null;
  }

  form = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]),
    confirmPassword: new FormControl(''),
  }, {validators: this.passwordMatchValidator});

  getControl(name: string) {
    return this.form.get(name);
  }

  isInvalid(name: string): boolean {
    const control = this.getControl(name);
    return !!(control?.invalid && control?.touched );
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.CreateUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.toastr.success("ایجاد حساب کاربری با موفقیت ایجاد شد.");
          }
        }, error: (err) => {
          console.error(err)
          this.toastr.error("اینجاد حساب کاربری با خطا مواجه شد!");
        }
      });
    } else {
      this.toastr.warning("لطفا تمام اطلاعات را وارد کنید.");
    }
  }
}
