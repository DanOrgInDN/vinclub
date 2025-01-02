import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type TransactionType = 'deposit' | 'withdrawal' | 'profit';

interface Transaction {
  date: string;
  amount: number;
  status: string;
  type: 'deposit' | 'withdrawal';
}

@Component({
  selector: 'app-transaction-history',
  imports: [ NavComponent, CommonModule ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent {
  constructor(private router: Router) {}
  selectedType: TransactionType = 'deposit';
  total: number = 0;

  transactions: Transaction[] = [
    { date: '2024-03-20', amount: 1000000, status: 'Thành công', type: 'deposit' },
    { date: '2024-03-19', amount: 2000000, status: 'Thành công', type: 'deposit' },
    { date: '2024-03-18', amount: 500000, status: 'Thành công', type: 'withdrawal' },
    { date: '2024-03-17', amount: 1500000, status: 'Thành công', type: 'withdrawal' },
  ];

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(t => t.type === this.selectedType);
  }

  onBack() {
    this.router.navigate(['/vinclub']);
  }

  selectType(type: TransactionType) {
    this.selectedType = type;
  }
}
