import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'angular-oauth2-oidc';
import { MenuItem } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { AuthServerApiService } from './auth-server-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-ui';

  items: MenuItem[] = [];

  userInfo?: UserInfo;

  userText: string = '';

  userMenuItems = [
    { label: 'Weclome Page', icon: 'pi pi-fw pi-home', id: '1' },
    { label: 'User', icon: 'pi pi-user', id: '2' },
    { label: 'Logout', icon: 'pi pi-power-off', id: '4' },
  ];

  adminMenuItems = [
    { label: 'Weclome Page', icon: 'pi pi-fw pi-home', id: '1' },
    { label: 'Admin', icon: 'pi pi-user-plus', id: '3' },
    { label: 'Logout', icon: 'pi pi-power-off', id: '4' },
  ];

  allMenuItems = [
    { label: 'Weclome Page', icon: 'pi pi-fw pi-home', id: '1' },
    { label: 'User', icon: 'pi pi-user', id: '2' },
    { label: 'Admin', icon: 'pi pi-user-plus', id: '3' },
    { label: 'Logout', icon: 'pi pi-power-off', id: '4' },
  ];

  constructor(
    private readonly authApiServer: AuthServerApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.authApiServer.userProfileSubject.subscribe((info) => {
    //   this.userInfo = info;
    //   console.log('APP COMPONENT welcome page userInfo: ', info);
    //   this.router.navigate(['welcome'], { relativeTo: this.route });
    // });

    //wait till the logged in user roles are identified and once a trigger is received load the menu bar accordingly
    this.authApiServer.userRolesSubject.subscribe((roles) => {
      console.log(
        'APP COMPONENT welcome page userInfo: ',
        authApiServer.userInfo
      );
      console.log('APP COMPONENT welcome page roles: ', roles);
      this.router.navigate(['welcome'], { relativeTo: this.route });
      this.loadMenuItems(roles);
    });
  }

  ngOnInit(): void {}

  loadMenuItems(roles: string[]) {
    if (roles.some((x) => x === 'admin') && roles.some((x) => x === 'user')) {
      this.items = this.allMenuItems;
    } else if (roles.some((x) => x === 'admin')) {
      this.items = this.adminMenuItems;
    } else if (roles.some((x) => x === 'user')) {
      this.items = this.userMenuItems;
    }
  }

  activateMenu(tab: TabMenu) {
    let selectedIndex = tab.activeItem.id;
    console.log('selectedIndex: ', tab.activeItem.id);
    if (selectedIndex == '1') {
      this.router.navigate(['welcome'], { relativeTo: this.route });
    } else if (selectedIndex == '2') {
      this.router.navigate(['user'], { relativeTo: this.route });
    } else if (selectedIndex == '3') {
      this.router.navigate(['admin'], { relativeTo: this.route });
    } else {
      this.logOut();
    }
  }

  logOut() {
    this.authApiServer.signOut();
  }
}
