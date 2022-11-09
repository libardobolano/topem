import { Injectable } from '@angular/core';
import {Order} from "../../../../core/models/orders/order";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseApi} from "../../../../core/models/_config/response-api";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _orders:Order[] = [];
  api:string = environment.EndPoint
  constructor(
    private _httpClient:HttpClient
  ) { }

  getOrdersService(data:any):Observable<ResponseApi>
  {
    return this._httpClient.get<ResponseApi>(`${this.api}api/orders`);
  }

  createOrderService(data:any):Observable<ResponseApi>
  {
    return this._httpClient.post<ResponseApi>(`${this.api}api/orders`,data);
  }

  getOrderService(order_id:number):Observable<ResponseApi>
  {
    return this._httpClient.get<ResponseApi>(`${this.api}api/orders/${order_id}`);
  }
  updateOrderService(order_id:number,data:any):Observable<ResponseApi>
  {
    return this._httpClient.put<ResponseApi>(`${this.api}api/orders/${order_id}`,data);
  }

  setOrders(_orders:Order[])
  {
    this._orders = _orders;
  }

  getOrders()
  {
    return this._orders;
  }
}
