import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserService } from '../../../../services/user/user.service';
import { UserInfo } from '../../../../model/user.model';
import { Withdrawal } from '../../../../model/transaction.model';
import { WithdrawalService } from '../../../../services/withdrawal/withdrawal.service';
import { NotificationService } from '../../../../shared/notification/services/notification.service';

@Component({
  selector: 'app-withdrawal',
  imports: [ NavComponent, CommonModule , FormsModule],
  templateUrl: './withdrawal.component.html',
  styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent {

 
  constructor(private location: Location, private authService: AuthService , private notificationService: NotificationService , private userService: UserService, private withdrawalService: WithdrawalService) {}
  userInfo!: UserInfo;
  withdrawal!: Withdrawal;  
  ngOnInit() {
    const userId = this.authService.userId;
    this.getUser(userId);
    this.initForm();
  }
  goBack() {
    this.location.back();
  }

  initForm() {
    this.withdrawal = {
      amount: 0,
      accountNumber: '',
      accountName: '',
      bankName: ''
    };
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

  onConfirm() {
    const data = {
      user_id: this.authService.userId,
      amount: this.withdrawal.amount,
      account_number: this.withdrawal.accountNumber,
      account_name: this.withdrawal.accountName,
      bank_name: this.withdrawal.bankName
    }
    this.withdrawalService.withdrawal(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.initForm();
          this.notificationService.showSuccess('Rút tiền thành công');
        } else {
          this.notificationService.showError('Rút tiền thất bại');
        }
      },
      error: (error) => {
        this.notificationService.showError('Rút tiền thất bại');
      }
    });
  }
}
