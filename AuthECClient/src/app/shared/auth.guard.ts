import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn())
  {
    const claimReq = route.data['ClaimReq'] as Function;
    if(claimReq)
    {
      if(!claimReq(authService.getClaims()))
      {
        router.navigateByUrl('/forbidden');
        return false;
      }
      return true;
    }
    return true;
  }
  else
    router.navigateByUrl('/signin');
  return false;
};
