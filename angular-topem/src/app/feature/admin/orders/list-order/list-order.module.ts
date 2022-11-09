import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrderRoutingModule } from './list-order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import {AdminModule} from "../../admin.module";


@NgModule({
  declarations: [
    ListOrderComponent
  ],
    imports: [
        CommonModule,
        ListOrderRoutingModule,
        AdminModule
    ]
})
export class ListOrderModule { }
