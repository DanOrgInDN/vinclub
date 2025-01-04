import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserInfo } from '../../../../model/user.model';
import { FileService } from '../../../../services/file/file.service';
import { Router } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  link: string;
}

@Component({
  selector: 'app-profile',
  imports: [NavComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // userData = {
  //   phone: '0978699931',
  //   balance: '0',
  //   avatar: 'assets/icons/user.png'
  // };
  menuItems: MenuItem[] = [];


  constructor(private location: Location, private userService: UserService,
    private authService: AuthService,
    private fileService: FileService, private router: Router) { }

  userInfo!: UserInfo;
  avatarUrl!: string;

  ngOnInit() {
    const userId = this.authService.userId;
    this.getUser(userId);
    this.initializeMenu();
  }

  private initializeMenu() {
    const baseMenuItems: MenuItem[] = [
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
    this.menuItems = baseMenuItems;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Xử lý upload avatar
      console.log('Upload avatar:', file);
      const userId = this.authService.userId;
      this.fileService.uploadFile(file, userId).subscribe({
        next: (response: any) => {
          this.avatarUrl = response.result_data.image_url;
          window.location.reload();
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  getUser(userId: string | null) {
    this.userService.getUser(userId).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.userInfo = response.result_data;
          console.log(this.userInfo);
          this.getAvatar(this.userInfo.imageUrl);
          
          // Kiểm tra role và thêm menu admin
          if (this.userInfo.roleName === 'ADMIN') {
            this.menuItems.unshift({ 
              icon: 'assets/icons/ca-nhan.png', 
              label: 'Quản lý', 
              link: '/vinclub/admin' 
            });
          }
        }
      },
      error: (error) => {
      }
    });
  }

  getAvatar(fileId: string | null) {
    if (fileId) {
      this.fileService.getAvatar(fileId).subscribe({
        next: (blobUrl: string) => {
          this.avatarUrl = blobUrl;
        },
        error: (error) => {
          this.avatarUrl = 'assets/icons/user.png'; // Fallback image
        }
      });
    } else {
      this.avatarUrl = 'assets/icons/user.png'; // Default image if no fileId
    }
  }

  ngOnDestroy() {
    if (this.avatarUrl && this.avatarUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.avatarUrl);
    }
  }

}