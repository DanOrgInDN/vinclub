import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './shared/notification/notification.component';
import { NotificationService } from './shared/notification/services/notification.service';
import { AlertService } from './shared/alert/services/alert.service';
import { AlertComponent } from './shared/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NotificationComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vinclub';
  
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';
  
  showAlert = false;
  alertMessage = '';
  alertType: 'confirm' | 'warning' = 'confirm';
  
  constructor(
    private notificationService: NotificationService,
    private alertService: AlertService
  ) {}
  
  ngOnInit() {
    // Subscribe to notification changes
    this.notificationService.notification$.subscribe(state => {
      this.showNotification = state.show;
      this.notificationMessage = state.message;
      this.notificationType = state.type;
    });
    
    this.alertService.alert$.subscribe(state => {
      this.showAlert = state.show;
      this.alertMessage = state.message;
      this.alertType = state.type;
    });
  }

  onAlertConfirm() {
    console.log('Alert confirmed');
    // Handle confirm action
  }

  onAlertCancel() {
    console.log('Alert cancelled');
    // Handle cancel action
  }
}
