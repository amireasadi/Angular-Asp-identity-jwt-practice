import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {HideIfClaimsNotMetDirective} from "../../shared/directives/hide-if-claims-not-met.directive";
import {ClaimReq} from "../../shared/utils/claimReq-utils";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HideIfClaimsNotMetDirective
  ],
  templateUrl: './main-layout.component.html',
  styles: ``
})
export class MainLayoutComponent {
  protected readonly ClaimReq = ClaimReq;

  constructor(private router: Router, private authService: AuthService) {
  }

  onLogout(){
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
}
