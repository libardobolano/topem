import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [],
    loadChildren: () => import('./login/login.module').then(i => i.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
