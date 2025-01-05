import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Recharge } from '../../../../model/transaction.model';

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
  totalPages = 1;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private adminService: AdminService) { }

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
      page_number: this.currentPage,
      page_size: this.pageSize
    }
    this.adminService.getDepositsPending(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.allDeposits = response.result_data.content;
          this.filteredDeposits = [...this.allDeposits];
          this.updateDisplayedDeposits();
        }
      },
      error: (error: any) => {
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
    this.searchSubject.next(this.searchTerm);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedDeposits();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  approveDeposit(id: string) {
    this.adminService.approveDeposit(id).subscribe({
      next: (response: any) => {
        this.loadAllDeposits();
      }
    });
  }

  rejectDeposit(id: string) {
    this.adminService.rejectDeposit(id).subscribe({
      next: (response: any) => {
        this.loadAllDeposits();
      }
    });
  }
}