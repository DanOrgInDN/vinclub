import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavComponent } from '../../../layout/nav/nav.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdrawal',
  imports: [ NavComponent, CommonModule , FormsModule],
  templateUrl: './withdrawal.component.html',
  styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent {
  userData = {
    phone: '0978699931',
    balance: '0',
    withdrawalAmount: '',
    accountNumber: '',
    bankName: '',
    owner: ''
  };
  constructor(private router: Router) {}


  onBack() {
    this.router.navigate(['/vinclub']);
  }

  onConfirm() {
    console.log('Withdrawal confirmed');
  }
}
