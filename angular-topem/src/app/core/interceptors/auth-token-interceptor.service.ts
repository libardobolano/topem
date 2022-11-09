import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {

  constructor() { }

  // @ts-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token:string|null = localStorage.getItem('token');

    let request = req;
    let header:any = {
      Accept: `application/json`
    }

    if (token) {
      header = {
        Accept: `application/json`,
        authorization: `Bearer ${ token }`
      }
    }
    request = req.clone({
      setHeaders: header
    });

    return next.handle(request);
  }
}
