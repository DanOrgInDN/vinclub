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

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.performSearch();
    });
  }

  loadAllUsers() {
    const data = {
      page_number: this.currentPage,
      page_size: this.pageSize
    }
    this.adminService.getAllUsers(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.allUsers = response.result_data.list_user;
          this.filteredUsers = [...this.allUsers];
          this.updateDisplayedUsers();
        }
      },
      error: (error: any) => {
      }
    });
  }

  private performSearch() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredUsers = [...this.allUsers];
    } else {
      this.filteredUsers = this.allUsers.filter(user =>
        user.phone.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.users = this.filteredUsers.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  searchUsers() {
    this.searchSubject.next(this.searchTerm);
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

  // deactivateUser(userId: string) {
  //   this.adminService.deactivateUser(userId).subscribe({
  //     next: (response: any) => {
  //       if (response.result_code === 1) {
  //         this.loadAllUsers();
  //       }
  //     }
  //   });
  // }

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