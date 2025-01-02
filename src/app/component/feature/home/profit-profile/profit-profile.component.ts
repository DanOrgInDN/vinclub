import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavComponent } from '../../../layout/nav/nav.component';

@Component({
  selector: 'app-profit-profile',
  imports: [NavComponent],
  templateUrl: './profit-profile.component.html',
  styleUrls: ['./profit-profile.component.scss']
})
export class ProfitProfileComponent {
  profileData = {
    registerDate: '30/12/2024',
    fullName: 'Trần Thị Cẩm Vân',
    phone: '0978699931',
    balance: '0',
    totalProfit: '0',
    totalBonus: '0',
    totalInvestment: '0'
  };

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/vinclub']);
  }
}