import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from './services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input() message: string = '';
  @Input() type: 'confirm' | 'warning' = 'confirm';
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  get iconClass(): string {
    return this.type === 'confirm' ? 'bi bi-question-circle' : 'bi bi-exclamation-circle';
  }

  constructor(private alertService: AlertService) {}

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('alert-overlay')) {
      this.onCancel();
    }
  }

  onConfirm() {
    this.alertService.confirm();
    this.closeAlert();
  }

  onCancel() {
    this.alertService.cancel();
    this.closeAlert();
  }

  private closeAlert() {
    this.showChange.emit(false);
  }

}
