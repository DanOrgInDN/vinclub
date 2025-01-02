import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  label: string;
  link: string;
}

@Component({
  selector: 'app-profile',
  imports: [ NavComponent, CommonModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData = {
    phone: '0978699931',
    balance: '0',
    avatar: 'assets/icons/user.png'
  };

  menuItems: MenuItem[] = [
    { icon: 'assets/icons/history.png', label: 'Lịch sử giao dịch', link: '/vinclub/transaction-history' },
    { icon: 'assets/icons/tham-van.png', label: 'Tham vấn phúc lợi', link: '/vinclub/welfare' },
    { icon: 'assets/icons/uu-dai.png', label: 'Ưu đãi phúc lợi', link: '/vinclub/award' },
    { icon: 'assets/icons/muc-tieu.png', label: 'Mục tiêu', link: '/vinclub/target' },
    { icon: 'assets/icons/san-pham.png', label: 'Sản phẩm', link: '/vinclub/product' },
    { icon: 'assets/icons/ho-so.png', label: 'Hồ sơ lợi nhuận', link: '/vinclub/profit-profile' },
    { icon: 'assets/icons/nap-tien.png', label: 'Nạp tiền', link: '/vinclub/recharge' },
    { icon: 'assets/icons/rut-tien.png', label: 'Rút tiền', link: '/vinclub/withdrawal' },
    { icon: 'assets/icons/information.png', label: 'Thông tin ứng dụng', link: '/vinclub/app-info' },
    { icon: 'assets/icons/mat-khau.png', label: 'Thay đổi mật khẩu', link: '/vinclub/change-password' }
  ];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Xử lý upload avatar
      console.log('Upload avatar:', file);
    }
  }

  logout() {
    console.log('Logout clicked');
  }
}