import { Globals } from './../../../pages/globals';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  server = [
    {
      value: 'prod',
      name: 'Production(Live Game)',
    },
    {
      value: 'qa',
      name: 'QA(For Testing)',
    },
    {
      value: 'local',
      name: 'Local(Not recomended)',
    },
  ];

  currentServer = localStorage.getItem('server');
  // current_server: string = localStorage.getItem('server') == null ? 'qa' : localStorage.getItem('server');
  current_server = 'qa';
  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private _global: Globals) {
                console.log(this.currentServer + 'current');
                if (this.currentServer == this._global.prod_url) {
                  this.current_server = 'prod';
                } else if (this.currentServer == this._global.local_url) {
                  this.currentServer = 'local';
                } else {
                  this.currentServer = 'qa';
                }
  }

  ngOnInit() {
    console.log(this.currentServer);
    // this._global.token = sessionStorage.getItem('token');
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  user_login(value: any) {
    this.user = value;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async login_check() {
    const return_value = await this._global.login();
    return true;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeServer(serverName: string){
    // tslint:disable-next-line: no-console
    console.log(serverName);
    this._global.onChangeServer(serverName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
