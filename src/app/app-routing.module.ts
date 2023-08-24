import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReadingsComponent } from './readings/readings.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from 'src/shared/guards/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InfoComponent } from './info/info.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' },
  { path: 'readings', pathMatch: 'full', component: ReadingsComponent, canActivate: [authGuard]},
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'forgotpassword', pathMatch: 'full', component: ForgotPasswordComponent},
  { path: 'chart', pathMatch: 'full', component: InfoComponent},
  { path: 'signup', pathMatch: 'full', component: SignupComponent},
  { path: 'verify-email', pathMatch: 'full', component: EmailVerificationComponent},
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
