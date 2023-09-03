import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewChecked {
  links: any[] = [];
  isLoggedIn: boolean;
  displayName: string;
  loggedinMenus : any[] = [];
  loggedOutMenus : any[] = [];
  @Input() isUserLoggedIn: boolean = false;
  userRole: string;

  constructor(private router: Router, private authService: AuthService){}
  ngAfterViewChecked(): void {
    this.checkLogin(null);
  }

  ngOnInit() {
    this.getUserRole();
    this.links = [];
    // this.checkLogin(null);
    this.isLoggedIn = false;
    // this.displayName = AuthService.user.displayName;
    this.loggedinMenus.push({
      name: 'Home',
      path: '/home',
      icon: 'home'
    });
    this.loggedinMenus.push({
      name: 'Readings',
      path: '/readings',
      icon: 'location_on'
    });
    this.loggedinMenus.push({
      name: 'Chart',
      path: '/chart',
      icon: 'show_chart'
    });
    // this.loggedinMenus.push({
    //   name: 'User',
    //   path: '/logout',
    //   icon: 'account_circle'
    // });
    this.loggedOutMenus.push({
      name: 'Login',
      path: '/login',
      icon: 'arrow_forward'
    });
    this.loggedOutMenus.push({
      name: 'Signup',
      path: '/signup',
      icon: 'perm_identity'
    });
  }

  public checkLogin(item: any) {
    // this.links = [];
      if(item && item === 'Logout'){
      this.authService.logout();
      this.isLoggedIn = false;
      this.displayName = '';
    }
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
      this.displayName = JSON.parse(localStorage.getItem("user"))?.displayName;
    }
    this.links = this.isLoggedIn ? this.loggedinMenus : this.loggedOutMenus;
  }

  getUserRole() {
    // setTimeout(() => {
    AuthService.role.subscribe((role: string) => {
      this.userRole = role;
    })
    // this.userRole = localStorage.getItem('role');

    // }, 1000);
  }
}
