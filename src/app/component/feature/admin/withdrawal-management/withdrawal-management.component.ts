import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Withdrawal } from '../../../../model/transaction.model';
import { NotificationService } from '../../../../shared/notification/services/notification.service';
import { AlertService } from '../../../../shared/alert/services/alert.service';

@Component({
  selector: 'app-withdrawal-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawal-management.component.html',
  styleUrls: ['./withdrawal-management.component.scss']
})
export class WithdrawalManagementComponent implements OnInit, OnDestroy {
  allWithdrawals: any[] = [];
  withdrawals: Withdrawal[] = [];
  filteredWithdrawals: Withdrawal[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalElements = 0;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadAllWithdrawals();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.performSearch();
    });
  }

  loadAllWithdrawals() {
    const data = {  
      page: this.currentPage,
    }
    this.adminService.getWithdrawals(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.withdrawals = response.result_data.content;
          this.totalElements = response.result_data.totalElements;
          this.totalPages = response.result_data.totalPages;
        }
      },
      error: (error: any) => {
      }
    });
  }

  private performSearch() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredWithdrawals = [...this.allWithdrawals];
    } else {
      this.filteredWithdrawals = this.allWithdrawals.filter(withdrawal =>
        withdrawal.accountName.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    
    this.totalPages = Math.ceil(this.filteredWithdrawals.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedWithdrawals();
  }

  updateDisplayedWithdrawals() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.withdrawals = this.filteredWithdrawals.slice(start, end);
  }

  searchWithdrawals() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.loadAllWithdrawals();
    } else {
      const data = {
        search_text: this.searchTerm,
        page: this.currentPage,
        size: this.pageSize,
      }
      this.adminService.searchWithdrawals(data).subscribe({
        next: (response: any) => {
          this.withdrawals = response.result_data.content;
          this.totalPages = response.result_data.totalPages;
        }
      });
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.searchWithdrawals();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  approveWithdrawal(id: string) {
    this.adminService.approveWithdrawal(id).subscribe({
      next: (response: any) => {
       if (response.result_code === 1) {
        this.loadAllWithdrawals();
        this.notificationService.showSuccess('Phê duyệt rút tiền thành công');
       } else {
        this.notificationService.showError('Phê duyệt rút tiền thất bại');
       }
      },
      error: (error) => {
        this.notificationService.showError('Phê duyệt rút tiền thất bại');
      }
    });
  }

  rejectWithdrawal(id: string) {
    this.alertService.show('Bạn có chắc chắn muốn từ chối yêu cầu rút tiền này?', 'warning');

    const subscription = this.alertService.onConfirm$.subscribe(() => {
      this.adminService.rejectWithdrawal(id).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.loadAllWithdrawals();
            this.notificationService.showSuccess('Từ chối rút tiền thành công');
          } else {
            this.notificationService.showError('Từ chối rút tiền thất bại');
          }
        },
        error: (error) => {
          this.notificationService.showError('Từ chối rút tiền thất bại');
        }
      });
      
      subscription.unsubscribe();
    });

    this.alertService.onCancel$.subscribe(() => {
      subscription.unsubscribe();
    });
  }
}