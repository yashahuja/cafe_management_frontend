import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({headers: request.headers.set('Authorization', 'bearer '+token)});
      request = request.clone({headers: request.headers.set('Access-Control-Allow-Origin', '*')});
      request = request.clone({headers: request.headers.set('Access-Control-Allow-Credentials', 'true')});
      request = request.clone({headers: request.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')});
      return next.handle(request);
    }
    return next.handle(request);
  }
}
