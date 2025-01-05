import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Withdrawal } from '../../../../model/transaction.model';
import { NotificationService } from '../../../../shared/notification/services/notification.service';

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
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private adminService: AdminService, private notificationService: NotificationService) { }

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

    this.adminService.getWithdrawals().subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.allWithdrawals = response.result_data.content;
          this.filteredWithdrawals = [...this.allWithdrawals];
          this.updateDisplayedWithdrawals();
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
    this.searchSubject.next(this.searchTerm);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedWithdrawals();
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
  }
}