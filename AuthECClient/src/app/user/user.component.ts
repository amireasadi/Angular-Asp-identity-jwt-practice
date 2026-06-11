import { Component } from '@angular/core';
import {RegistrationComponent} from "./registration/registration.component";
import {RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {

}
