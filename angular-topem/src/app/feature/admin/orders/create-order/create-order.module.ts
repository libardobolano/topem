import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrderRoutingModule } from './create-order-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import {AdminModule} from "../../admin.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateOrderComponent
  ],
    imports: [
        CommonModule,
        CreateOrderRoutingModule,
        AdminModule,
        ReactiveFormsModule
    ]
})
export class CreateOrderModule { }
