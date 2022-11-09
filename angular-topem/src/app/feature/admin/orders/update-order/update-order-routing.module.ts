import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpdateOrderComponent} from "./update-order/update-order.component";

const routes: Routes = [
  { path: '', component: UpdateOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateOrderRoutingModule { }
