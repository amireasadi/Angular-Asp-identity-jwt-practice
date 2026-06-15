import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  fullName: string = '';
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.fullName = res.fullName;

      },
      error: (err) => {
        console.log('Error while retrieving user profile.', err)
      }
    })
  }

  onLogout(){
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
}
