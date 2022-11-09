import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {AuthTokenInterceptorService} from "./interceptors/auth-token-interceptor.service";
import {GlobalErrorHandleService} from "./errors/global-error-handle.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers:[
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandleService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptorService,
      multi: true
    }
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule
  ]
})
export class CoreModule { }
