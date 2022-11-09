import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateOrderRoutingModule } from './update-order-routing.module';
import { UpdateOrderComponent } from './update-order/update-order.component';
import {AdminModule} from "../../admin.module";
import {CoreModule} from "../../../../core/core.module";


@NgModule({
  declarations: [
    UpdateOrderComponent
  ],
  imports: [
    CommonModule,
    UpdateOrderRoutingModule,
    AdminModule,
    CoreModule
  ]
})
export class UpdateOrderModule { }
