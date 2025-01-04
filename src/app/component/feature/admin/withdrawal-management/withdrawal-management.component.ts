import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdrawal-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawal-management.component.html',
  styleUrls: ['./withdrawal-management.component.scss']
})
export class WithdrawalManagementComponent implements OnInit {
  withdrawals: any[] = [];
  searchTerm: string = '';
  
  constructor() {}

  ngOnInit() {
    this.loadWithdrawals();
  }

  loadWithdrawals() {
    // TODO: Call API to load withdrawals
  }

  searchWithdrawals() {
    // TODO: Implement search
  }

  approveWithdrawal(id: string) {
    // TODO: Implement approve
  }

  rejectWithdrawal(id: string) {
    // TODO: Implement reject
  }
}