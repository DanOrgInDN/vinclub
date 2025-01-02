import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../../layout/nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge',
  imports: [ NavComponent, CommonModule, FormsModule ],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.scss'
})
export class RechargeComponent {
  userData = {
    fullName: 'Trần Thị Cẩm Vân  0978699931',
    phone: '0978699931',
    balance: '0',
    accountNumber: '',
    bankName: '',
    owner: ''
  };

  constructor(private router: Router) {}

  onUpdate() {
    console.log('Update clicked');
  }

  onBack() {
    this.router.navigate(['/vinclub']);
  }
}