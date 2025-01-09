import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Recharge } from '../../../../model/transaction.model';
import { NotificationService } from '../../../../shared/notification/services/notification.service';
import { AlertService } from '../../../../shared/alert/services/alert.service';

@Component({
  selector: 'app-deposit-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposit-management.component.html',
  styleUrls: ['./deposit-management.component.scss']
})
export class DepositManagementComponent implements OnInit, OnDestroy {
  allDeposits: any[] = [];
  deposits: Recharge[] = [];
  filteredDeposits: Recharge[] = [];
  currentPage = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages = 1;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadAllDeposits();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.performSearch();
    });
  }

  loadAllDeposits() {
    const data = {
      page: this.currentPage,
    }
    this.adminService.getDepositsPending(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.deposits = response.result_data.content;
          this.totalElements = response.result_data.totalElements;
          this.totalPages = response.result_data.totalPages;
        }
      },
      error: (error) => {
        // Handle error
      }
    });
  }

  private performSearch() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredDeposits = [...this.allDeposits];
    } else {
      this.filteredDeposits = this.allDeposits.filter(deposit =>
        deposit.accountName.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }

    this.totalPages = Math.ceil(this.filteredDeposits.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedDeposits();
  }

  updateDisplayedDeposits() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.deposits = this.filteredDeposits.slice(start, end);
  }

  searchDeposits() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.loadAllDeposits();
    } else {
      const data = {
        search_text: this.searchTerm,
        page: this.currentPage,
        size: this.pageSize,
      }
      this.adminService.searchDeposits(data).subscribe({
        next: (response: any) => {
          this.deposits = response.result_data.content;
          this.totalPages = response.result_data.totalPages;
          this.totalElements = response.result_data.total_records;
        }
      });
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.searchDeposits();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  approveDeposit(id: string) {
    this.alertService.show('Bạn có chắc chắn muốn phê duyệt giao dịch nạp tiền này?', 'warning');

    const subscription = this.alertService.onConfirm$.subscribe(() => {
      this.adminService.approveDeposit(id).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
          this.loadAllDeposits();
          this.notificationService.showSuccess('Phê duyệt giao dịch thành công');
        } else {
          this.notificationService.showError('Phê duyệt giao dịch thất bại');
        }
      },
      error: (error) => {
          this.notificationService.showError('Phê duyệt giao dịch thất bại');
        }
      });
      subscription.unsubscribe();
    });

    this.alertService.onCancel$.subscribe(() => {
      subscription.unsubscribe();
    });
  }

  rejectDeposit(id: string) {
    this.alertService.show('Bạn có chắc chắn muốn từ chối giao dịch nạp tiền này?', 'warning');

    const subscription = this.alertService.onConfirm$.subscribe(() => {
      this.adminService.rejectDeposit(id).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.loadAllDeposits();
            this.notificationService.showSuccess('Từ chối giao dịch thành công');
          } else {
            this.notificationService.showError('Từ chối giao dịch thất bại');
          }
        },
        error: (error) => {
          this.notificationService.showError('Từ chối giao dịch thất bại');
        }
      });

      subscription.unsubscribe();
    });

    this.alertService.onCancel$.subscribe(() => {
      subscription.unsubscribe();
    });
  }
}
