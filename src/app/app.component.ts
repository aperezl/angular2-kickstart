import {Component, Inject, ElementRef} from 'angular2/core';
import {HeroService} from './hero.service';
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';


@Component({
  selector: 'my-app',
  template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">{{title}}</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a [routerLink]="['Dashboard']" class="mdl-navigation__link">Dashboard</a>
          <a [routerLink]="['Heroes']" class="mdl-navigation__link">Heroes</a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
    <div class="page-content">
      <!-- Your content goes here -->

      <div class="mdl-grid" style="background-color: #f0f0f0">
        <div class="mdl-cell mdl-cell--12-col">
          <router-outlet></router-outlet>
        </div>
      </div>

    </div>
  </main>
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
  protected _elementRef;
  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

  onInit() {
    // window.componentHandler.upgradeElement is provided by Material Design Lite
    // and is necessary to call in order to "augment" dynamically added HTML
    window.componentHandler.upgradeElement(this._elementRef.nativeElement.firstElementChild);
  }
}
