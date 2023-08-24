import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { EventService } from '../services/event/event.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLoggedIn()){
    return true;
  }else{
   inject(Router).navigate(['/login']);
   inject(EventService).showSuccessMessage('User is not Logged In!');
   return false;
  }
};
