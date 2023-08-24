import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { EventService } from 'src/shared/services/event/event.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email: string = '';
  constructor(private authService: AuthService, public eventService: EventService){}

  public forgotPassword(form : NgForm){
    this.authService.forgetPassword(this.email);
  }
}
