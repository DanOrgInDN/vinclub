import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './shared/notification/notification.component';
import { NotificationService } from './shared/notification/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vinclub';
  
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';
  
  constructor(private notificationService: NotificationService) {}
  
  ngOnInit() {
    // Subscribe to notification changes
    this.notificationService.notification$.subscribe(state => {
      this.showNotification = state.show;
      this.notificationMessage = state.message;
      this.notificationType = state.type;
    });
  }
}
