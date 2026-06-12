import {Component} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {animate, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './user.component.html',
  styles: ``,
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(':enter', [
            style({opacity: 0}),
            animate('0.5s ease-in-out', style({opacity: 1}))
          ],
          {optional: true}
        ),
      ])
    ])
  ]
})
export class UserComponent {
  constructor(private context: ChildrenOutletContexts) {
  }

  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
