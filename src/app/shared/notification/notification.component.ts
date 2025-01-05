import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [ CommonModule ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();

  get iconClass(): string {
    return this.type === 'success' ? 'bi bi-check-circle' : 'bi bi-x-circle';
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('notification-overlay')) {
      this.closeNotification();
    }
  }

  closeNotification() {
    this.showChange.emit(false);
  }

  ngOnInit() {
    
  }

}
