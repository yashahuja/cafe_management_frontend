import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { EventService } from '../event/event.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../../../src/app/app.settings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private eventService: EventService,
    private http: HttpClient
  ) {}

  sessionId: any;
  public static role = new Subject();

  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  public logout(msg: any = '') {
    if (this.sessionId) {
      clearTimeout(this.sessionId);
    }
    this.signout(msg);
  }

  public login(email: string, password: string) {
    AuthService.role.next('');
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (res: any) => {
        if (this.sessionId) {
          clearTimeout(this.sessionId);
        }
        if (!res.user.emailVerified) {
          // this.router.navigate(['/verify-email']);
          // return;
        }

        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.user.multiFactor.user.accessToken);
        // AuthService.user = res.user;
        this.router.navigate(['/home']);
        this.eventService.showSuccessMessage('User Logged In successfully!');
        this.sessionId = setTimeout(() => {
          this.logout('Session time out!');
        }, 3600000);
        this.getUserRole(res.user.uid, AppSettings.GetUserRole).subscribe((res: any) => {
          if (res && res.role) {
            AuthService.role.next(res.role);
            // localStorage.setItem('role', res.role);
          } else {
            // localStorage.setItem('role', 'viewer');
          }
        });
      },
      (err) => {
        console.log(err.message);
        this.eventService.showSuccessMessage('Invalid email or password.');
      }
    );
  }

  private getUserRole(uid: any, url: any) {
    // JSON.parse(localStorage.getItem("user"))
    const headerList = {
      uid: uid,
    };
    const options = { headers: new HttpHeaders(headerList) };
    return this.http.get(url, options);
  }

  public forgetPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.eventService.showSuccessMessage(
          'Password reset link has been sent on email.'
        );
      },
      (err) => {
        console.log(err.message);
        this.eventService.showSuccessMessage(
          'No record found with this email.'
        );
      }
    );
  }

  public register(user: any, url: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res: any) => {
          this.sendVerificationEmail(res.user);
          user.uid = res.user.uid;
          this.updateUser(user, url).subscribe((res: any) => {
            if (res && res.errorCode === 200) {
              // this.eventService.showSuccessMessage(res.message);
              // this.router.navigate(['/login']);
            } else {
              this.eventService.showSuccessMessage(res.message);
            }
          });
      });
  }

  public updateUser(user: any, url: string){
    return this.http.post(url, { body: user });
  }

  public sendVerificationEmail(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.eventService.showSuccessMessage(
          'verification email sent successfully'
        );
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        this.eventService.showSuccessMessage('Something went wrong '+err.message);
      }
    );
  }

  public signout(msg: any = '') {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        this.router.navigate(['/login']);
        this.eventService.showSuccessMessage(
          msg ? msg : 'User logged out successfully.'
        );
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
