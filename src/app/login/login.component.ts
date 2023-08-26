import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  constructor(private authService: AuthService){}

  ngOnInit() {
    if (localStorage.getItem("token") !== null ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  public login(){
    this.authService.login(this.email, this.password);
  }

}
