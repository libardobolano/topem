import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Component import
 */
import { AppComponent } from './app.component';

/**
 * Router import
 */
import { AppRoutingModule } from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
