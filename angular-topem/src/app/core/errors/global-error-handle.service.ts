import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandleService implements ErrorHandler {
  constructor(
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) {}

  handleError(error: any): void {
    console.log(error);
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.spinner.hide();
    this.notification.showErrorAlert(error?.message || 'Undefined client error')

  }
}
