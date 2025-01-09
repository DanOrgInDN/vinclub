import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { UserInfo } from '../../../../model/user.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from '../../../../shared/notification/services/notification.service';
import { AlertService } from '../../../../shared/alert/services/alert.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  allUsers: UserInfo[] = [];
  users: UserInfo[] = [];
  filteredUsers: UserInfo[] = [];
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 1;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    const data = {
      page_number: this.currentPage,
      page_size: this.pageSize
    }
    this.adminService.getAllUsers(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.users = response.result_data.list_user;
          this.totalRecords = response.result_data.total_records;
          this.totalPages = response.result_data.total_page;
        }
      },
      error: (error: any) => {
        // Handle error
      }
    });
  }


  changePage(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  searchUsers() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.loadAllUsers();
    } else {
      const data = {
        search_text: this.searchTerm,
        page_number: this.currentPage,
        page_size: this.pageSize
      }
      this.adminService.searchUsers(data).subscribe({
        next: (response: any) => {
          this.users = response.result_data.list_user;
          this.totalPages = response.result_data.total_page;
        }
      });
    }
  }

  activateUser(userId: string) {
    this.adminService.activateUser(userId).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.loadAllUsers();
          this.notificationService.showSuccess('Kích hoạt tài khoản thành công');
        } else {
          this.notificationService.showError('Kích hoạt tài khoản thất bại');
        }
      },
      error: (error) => {
        this.notificationService.showError('Kích hoạt tài khoản thất bại');
      }
    });
  }

  deactivateUser(userId: string) {
    this.adminService.activateUser(userId).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.loadAllUsers();
          this.notificationService.showSuccess('Vô hiệu hóa tài khoản thành công');
        } else {
          this.notificationService.showError('Vô hiệu hóa tài khoản thất bại');
        }
      },
      error: (error) => {
        this.notificationService.showError('Vô hiệu hóa tài khoản thất bại');
      }
    });
  }

  deleteUser(userId: string) {
    this.alertService.show('Bạn có chắc chắn muốn xóa tài khoản này?', 'warning');

    const subscription = this.alertService.onConfirm$.subscribe(() => {
      this.adminService.deleteUser(userId).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.loadAllUsers();
            this.notificationService.showSuccess('Xóa tài khoản thành công');
          } else {
            this.notificationService.showError('Xóa tài khoản thất bại');
          }
        },
        error: (error) => {
          this.notificationService.showError('Xóa tài khoản thất bại');
        }
      });

      subscription.unsubscribe();
    });

    this.alertService.onCancel$.subscribe(() => {
      subscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}