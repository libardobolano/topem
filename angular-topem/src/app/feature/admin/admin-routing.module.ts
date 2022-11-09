import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./layuts/main/main.component";

const routes: Routes = [
  {
    path: 'orders',
    component: MainComponent,
    canActivate: [],
    loadChildren: () => import('./orders/orders.module').then(i => i.OrdersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
