import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {ClaimReq} from "../shared/utils/claimReq-utils";
import {HideIfClaimsNotMetDirective} from "../shared/directives/hide-if-claims-not-met.directive";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HideIfClaimsNotMetDirective
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {
  protected readonly ClaimReq = ClaimReq;
  fullName: string = '';

  constructor(private userService: UserService) {
  }

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
}
