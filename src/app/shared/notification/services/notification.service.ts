import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationState = new BehaviorSubject<NotificationState>({
    show: false,
    message: '',
    type: 'success'
  });

  notification$ = this.notificationState.asObservable();

  showSuccess(message: string) {
    this.notificationState.next({
      show: true,
      message,
      type: 'success'
    });
  }

  showError(message: string) {
    this.notificationState.next({
      show: true,
      message,
      type: 'error'
    });
  }

  hide() {
    this.notificationState.next({
      ...this.notificationState.value,
      show: false
    });
  }
}