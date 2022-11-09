import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  title:string = '';
  icon:string = '';
  constructor() { }

  showSuccessAlert(message:any)
  {
    this.showAlert({
      title: 'Success!',
      icon: 'success',
      text: message
    })
  }

  showInfoAlert(message:any)
  {
    this.showAlert({
      title: 'Info!',
      icon: 'info',
      text: message
    })
  }

  showWarningAlert(message:any)
  {
    this.showAlert({
      title: 'Warning!',
      icon: 'warning',
      text: message
    })
  }

  showErrorAlert(message:any)
  {
    this.showAlert({
      title: 'Error!',
      icon: 'error',
      text: message
    })
  }

  showAlert(data:any)
  {
    Swal.fire(data);
  }
}
