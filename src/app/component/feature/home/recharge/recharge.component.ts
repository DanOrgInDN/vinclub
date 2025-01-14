import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../../layout/nav/nav.component';
import { Location } from '@angular/common';
import { UserInfo } from '../../../../model/user.model';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { RechargeService } from '../../../../services/recharge/recharge.service';
import { Recharge } from '../../../../model/transaction.model';
import { NotificationService } from '../../../../shared/notification/services/notification.service';

@Component({
  selector: 'app-recharge',
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.scss'
})
export class RechargeComponent implements OnInit {



  constructor(private location: Location, private authService: AuthService,
    private userService: UserService,
    private rechargeService: RechargeService,
    private notificationService: NotificationService) { }
  userInfo!: UserInfo;
  recharge!: Recharge;
  initForm() {
    this.recharge = {
      accountNumber: '',
      bankName: '',
      accountName: '',
      amount: 0
    };
  }
  ngOnInit() {
    const userId = this.authService.userId;
    this.getUser(userId);
    this.initForm();
  }

  getUser(userId: string | null) {
    this.userService.getUser(userId).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.userInfo = response.result_data;
          console.log(this.userInfo);

        }
      },
      error: (error) => {
      }
    });
  }

  onUpdate() {
    const data = {
      user_id: this.userInfo.userId,
      amount: this.recharge.amount,
      account_number: this.recharge.accountNumber,
      account_name: this.recharge.accountName,
      bank_name: this.recharge.bankName,
    };
    console.log(data);
    this.rechargeService.recharge(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.initForm();
          this.notificationService.showSuccess('Nạp tiền thành công');
        } else {
          this.notificationService.showError('Nạp tiền thất bại');
        }
      },
      error: (error) => {
        this.notificationService.showError('Nạp tiền thất bại');
      }
    });
  }

  onBack() {
    this.location.back();
  }
}
