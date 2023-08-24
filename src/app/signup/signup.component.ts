import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { EventService } from 'src/shared/services/event/event.service';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  role: string = '';

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = 'contributer';
  }

  public signup() {
    if(this.checkPhoneNumber()){
      this.authService.register(
        {
          name: this.name,
          email: this.email,
          phoneNumber: '+' + this.phoneNumber.toString(),
          password: this.password,
          role: this.role,
        },
        AppSettings.UpdateUser
      );
    }else{
      this.eventService.showSuccessMessage('Phone number should start with +353 and rest must be of length 9.')
    }
  
  }

public checkPhoneNumber(): boolean{
  const regex = /^\+353\d{9}$/; 
  return regex.test('+'+this.phoneNumber);

}

}
