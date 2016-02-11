import {Component} from 'angular2/core';
import {HeroService} from './hero.service';
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
  selector: 'my-app',
  template: `
  <md-content flex>
  <md-toolbar class="hero"><h1>ng2-material…</h1></md-toolbar>


      <a [routerLink]="['Dashboard']" class="mdl-navigation__link">Dashboard</a>
      <a [routerLink]="['Heroes']" class="mdl-navigation__link">Heroes</a>
      {{title}}
      <router-outlet></router-outlet>
</md-content>
  `,
  //styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HeroService, ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])

export class AppComponent {
  title =  "Tour of Heroes2";
}
