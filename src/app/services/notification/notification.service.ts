import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toasts: ToastrService) { }

  showSuccess(message: string, title?: string) {
    this.toasts.success(message || '', title || 'Success')
  }

  showError(message: string, title?: string) {
    this.toasts.error(message || 'Something Went Wrong!', title || 'Error')
  }

  showInfo(message: string, title?: string) {
    this.toasts.info(message || '', title || 'Info')
  }

  showWarning(message: string, title?: string) {
    this.toasts.warning(message || '', title || 'Warning')
  }
}
