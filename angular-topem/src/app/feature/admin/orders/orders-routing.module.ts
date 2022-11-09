import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    loadChildren: () => import('./list-order/list-order.module').then(i => i.ListOrderModule),
  },
  {
    path: 'create',
    canActivate: [],
    loadChildren: () => import('./create-order/create-order.module').then(i => i.CreateOrderModule),
  },
  {
    path: 'update/:order_id',
    canActivate: [],
    loadChildren: () => import('./update-order/update-order.module').then(i => i.UpdateOrderModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
