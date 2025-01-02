import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

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
  constructor(private location: Location) {}


  goBack() {
    this.location.back();
  }

  onConfirm() {
    console.log('Withdrawal confirmed');
  }
}
