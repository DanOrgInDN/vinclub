import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { NotificationService } from '../../../../shared/notification/services/notification.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { LoginService } from '../../../../services/login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [NavComponent, CommonModule, FormsModule]
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  errorMessage = '';

  constructor(private location: Location, private loginService: LoginService, private notificationService: NotificationService, private authService: AuthService   ) {}  

  togglePasswordVisibility(field: 'old' | 'new' | 'confirm') {
    switch(field) {
      case 'old':
        this.showOldPassword = !this.showOldPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  validatePasswords(): boolean {
    // Reset error message
    this.errorMessage = '';

    // Kiểm tra mật khẩu cũ không được trống
    if (!this.oldPassword) {
      this.errorMessage = 'Vui lòng nhập mật khẩu cũ';
      return false;
    }

    // Kiểm tra mật khẩu mới không được trống
    if (!this.newPassword) {
      this.errorMessage = 'Vui lòng nhập mật khẩu mới';
      return false;
    }

    // Kiểm tra xác nhận mật khẩu không được trống
    if (!this.confirmPassword) {
      this.errorMessage = 'Vui lòng xác nhận mật khẩu mới';
      return false;
    }

    // Kiểm tra mật khẩu mới không được giống mật khẩu cũ
    if (this.newPassword === this.oldPassword) {
      this.errorMessage = 'Mật khẩu mới không được trùng với mật khẩu cũ';
      return false;
    }

    // Kiểm tra độ dài mật khẩu mới (ví dụ: tối thiểu 6 ký tự)
    if (this.newPassword.length < 6) {
      this.errorMessage = 'Mật khẩu mới phải có ít nhất 6 ký tự';
      return false;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu phải giống nhau
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Xác nhận mật khẩu không khớp';
      return false;
    }

    return true;
  }

  initForm() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.showOldPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
  }

  onSubmit() {
    if (this.validatePasswords()) {
      const data = {
        username: this.authService.username,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }
      this.loginService.changePassword(data).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.initForm();
            this.notificationService.showSuccess('Thay đổi mật khẩu thành công');
          } else {
            this.notificationService.showError('Thay đổi mật khẩu thất bại');
          }
        }
      });
    }   
  }

  goBack() {
    this.location.back();
  }
}