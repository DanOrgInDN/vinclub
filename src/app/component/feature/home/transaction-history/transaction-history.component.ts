import {Component, OnInit} from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../enviroment/enviroment';
import { AuthService } from '../../../../services/auth/auth.service';


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
export class TransactionHistoryComponent implements OnInit {

  private apiUrl = environment.apiUrl + '/user/transaction';
  constructor(private location: Location, private http: HttpClient, private authService: AuthService) {}
  selectedType: TransactionType = 'deposit';
  total: number = 0;
  transactions: Transaction[] = [];

  ngOnInit() {
    const userId = this.authService.userId;
    this.fetchTransactions(userId);
  }

  fetchTransactions(userId: string | null): void {
    this.getTransactions(userId).subscribe( {
      next: (response: any) => {
        if (response.result_code === 1) {
          this.transactions = response.result_data;
        }
      },
        error: (error) => {
      }
    });
  }

  getTransactions(user_id: string | null): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${user_id}`);
  }

  getUser(user_id: string | null) {
    return this.http.get(`${this.apiUrl}/${user_id}`);
  }

  // transactions: Transaction[] = [
  //   { date: '2024-03-20', amount: 1000000, status: 'Thành công', type: 'deposit' },
  //   { date: '2024-03-19', amount: 2000000, status: 'Thành công', type: 'deposit' },
  //   { date: '2024-03-18', amount: 500000, status: 'Thành công', type: 'withdrawal' },
  //   { date: '2024-03-17', amount: 1500000, status: 'Thành công', type: 'withdrawal' },
  // ];

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(t => t.type === this.selectedType);
  }

  onBack() {
    this.location.back();
  }

  selectType(type: TransactionType) {
    this.selectedType = type;
  }
}
