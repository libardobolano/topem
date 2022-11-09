import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ResponseApi} from "../../models/_config/response-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api:string = environment.EndPoint
  constructor(
    private _httpClient:HttpClient
  ) { }

  login(data:any):Observable<ResponseApi>
  {
    return this._httpClient.post<ResponseApi>(`${this.api}api/auth/login`,data);
  }

  logout():Observable<ResponseApi>
  {
    return this._httpClient.post<ResponseApi>(`${this.api}api/auth/logout`, {});
  }

  isAuthenticate()
  {
    const token = localStorage.getItem('token');
    if(token)return true;
    return false;
  }
}
