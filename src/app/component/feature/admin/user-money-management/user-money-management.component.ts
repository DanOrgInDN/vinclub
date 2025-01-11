import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { UserInfo } from '../../../../model/user.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from '../../../../shared/notification/services/notification.service';
import { AlertService } from '../../../../shared/alert/services/alert.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-money-management.component.html',
  styleUrls: ['./user-money-management.component.scss']
})
export class UserMoneyManagementComponent implements OnInit {

  addUsername!: string;
  addAmount!: number;


  subtractUsername!: string;
  subtractAmount!: number;

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  addMoney() {
    this.alertService.show(`Cộng ${this.addAmount}VNĐ cho ${this.addUsername} ?`, 'warning');

    const subscription = this.alertService.onConfirm$.subscribe(() => {


      this.adminService.addFund(this.addUsername, this.addAmount).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.notificationService.showSuccess('Cộng tiền thành công');
            this.addAmount = 0;
          } else {
            this.notificationService.showError(`Không tìm thấy người dùng này: ${this.addUsername}`);
          }
        },
        error: (error) => {
          this.notificationService.showError('Cộng tiền thất bại');
        }
      });

      subscription.unsubscribe();
    });

    this.alertService.onCancel$.subscribe(() => {
      subscription.unsubscribe();
    });
  }

  subtractMoney() {
    this.alertService.show(`Trừ ${this.subtractAmount}VNĐ cho ${this.subtractUsername}`, 'warning');

    const subscription = this.alertService.onConfirm$.subscribe(() => {


      this.adminService.deductFund(this.subtractUsername, this.subtractAmount).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.notificationService.showSuccess('Trừ tiền thành công');
            this.subtractAmount = 0;
          } else {
            this.notificationService.showError(`Không tìm thấy người dùng này: ${this.subtractUsername}`);
          }
        },
        error: (error) => {
          this.notificationService.showError('Trừ tiền thất bại');
        }
      });

      subscription.unsubscribe();
    });

    this.alertService.onCancel$.subscribe(() => {
      subscription.unsubscribe();
    });
  }


}
