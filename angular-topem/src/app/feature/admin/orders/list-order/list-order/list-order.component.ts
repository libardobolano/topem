import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../../../../core/models/orders/order";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  private _eventGetOrderServie:any = null;
  constructor(
    private spinner:NgxSpinnerService,
    private _orderService:OrdersService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.iniData({page:1});
  }

  ngOnDestroy()
  {
    if(this._eventGetOrderServie)this._eventGetOrderServie.unsubscribe();
  }

  iniData(data:any)
  {
    this._eventGetOrderServie = this._orderService.getOrdersService([{key:'page',value:data.page}]).subscribe((resp)=>{
      this.orders = resp.data.data;
      this.spinner.hide();
    });
  }

  set orders(orders:Order[])
  {
    this._orderService.setOrders(orders);
  }

  get orders()
  {
    return this._orderService.getOrders();
  }

}
