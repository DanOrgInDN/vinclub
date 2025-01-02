import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

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

  constructor(private location: Location) {}  

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

  onSubmit() {
    if (this.validatePasswords()) {
      // Xử lý thay đổi mật khẩu nếu validation thành công
      console.log('Password validation successful');
    }
  }

  goBack() {
    this.location.back();
  }
}