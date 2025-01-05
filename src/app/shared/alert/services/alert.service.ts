import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface AlertState {
  show: boolean;
  message: string;
  type: 'confirm' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertState = new BehaviorSubject<AlertState>({
    show: false,
    message: '',
    type: 'confirm'
  });

  private confirmSubject = new Subject<void>();
  private cancelSubject = new Subject<void>();

  alert$ = this.alertState.asObservable();
  onConfirm$ = this.confirmSubject.asObservable();
  onCancel$ = this.cancelSubject.asObservable();

  show(message: string, type: 'confirm' | 'warning' = 'confirm') {
    this.alertState.next({
      show: true,
      message,
      type
    });
  }

  hide() {
    this.alertState.next({
      ...this.alertState.value,
      show: false
    });
  }

  confirm() {
    this.confirmSubject.next();
    this.hide();
  }

  cancel() {
    this.cancelSubject.next();
    this.hide();
  }
}