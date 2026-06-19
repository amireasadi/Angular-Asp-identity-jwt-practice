import {Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {RegistrationComponent} from "./user/registration/registration.component";
import {LoginComponent} from "./user/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./shared/auth.guard";
import {AdminOnlyComponent} from "./authorizationDemo/admin-only/admin-only.component";
import {AdminOrTeacherComponent} from "./authorizationDemo/admin-or-teacher/admin-or-teacher.component";
import {
  ApplyForMaternityLeaveComponent
} from "./authorizationDemo/apply-for-maternity-leave/apply-for-maternity-leave.component";
import {LibraryMembersOnlyComponent} from "./authorizationDemo/library-members-only/library-members-only.component";
import {Under10AndFemaleComponent} from "./authorizationDemo/under10-and-female/under10-and-female.component";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {ClaimReq} from "./shared/utils/claimReq-utils";

export const routes: Routes = [{
  path: '', redirectTo: '/signin', pathMatch: "full"
}, {
  path: '', component: UserComponent, children: [{
    path: 'signup', component: RegistrationComponent,
  }, {
    path: 'signin', component: LoginComponent,
  }],
}, {
  path: '', component: MainLayoutComponent, canActivate: [authGuard], canActivateChild: [authGuard], children: [{
    path: 'dashboard', component: DashboardComponent
  }, {
    path: 'admin-only', component: AdminOnlyComponent, data: {ClaimReq: ClaimReq.adminOnly}
  }, {
    path: 'admin-or-teacher', component: AdminOrTeacherComponent, data: {ClaimReq: ClaimReq.adminOrTeacher}
  }, {
    path: 'apply-for-maternity', component: ApplyForMaternityLeaveComponent, data: {ClaimReq: ClaimReq.femaleAndTeacher}
  }, {
    path: 'library-members-only', component: LibraryMembersOnlyComponent, data: {ClaimReq: ClaimReq.hasLibraryId}
  }, {
    path: 'Under10-female', component: Under10AndFemaleComponent, data: {ClaimReq: ClaimReq.femaleAndUnder10}
  }, {
    path: 'forbidden', component: ForbiddenComponent
  },]
}];
