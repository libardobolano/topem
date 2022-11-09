import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './layuts/sidebar/sidebar.component';
import { MenuComponent } from './layuts/menu/menu.component';
import { MainComponent } from './layuts/main/main.component';
import {CoreModule} from "../../core/core.module";
import { SubHeaderComponent } from './shared/components/sub-header/sub-header.component';


@NgModule({
  declarations: [
    SidebarComponent,
    MenuComponent,
    MainComponent,
    SubHeaderComponent
  ],
  exports: [
    SubHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
