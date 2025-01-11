import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavComponent } from '../../../layout/nav/nav.component';
import { UserInfo } from '../../../../model/user.model';
import { UserService } from '../../../../services/user/user.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-profit-profile',
  imports: [NavComponent , CommonModule],
  templateUrl: './profit-profile.component.html',
  styleUrls: ['./profit-profile.component.scss']
})
export class ProfitProfileComponent implements OnInit {
  // profileData = {
  //   registerDate: '30/12/2024',
  //   fullName: 'Trần Thị Cẩm Vân',
  //   phone: '0978699931',
  //   balance: '0',
  //   totalProfit: '0',
  //   totalBonus: '0',
  //   totalInvestment: '0'
  // };

  userInfo!: UserInfo;

  constructor(private location: Location, private userService: UserService, private authService: AuthService) { }
  ngOnInit() {
    const userId = this.authService.userId;
    this.getUser(userId);
  }

  getUser(id: string | null) {
    this.userService.getUser(id).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.userInfo = response.result_data;
          console.log(this.userInfo);
        }
      },
      error: (error: any) => {
      }
    });
  }


  goBack() {
    this.location.back();
  }
}
