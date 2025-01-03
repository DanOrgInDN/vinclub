import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { NavComponent } from '../../layout/nav/nav.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UserInfo } from '../../../model/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NavComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private userService: UserService) {}
    userInfo!: UserInfo;
    ngOnInit() {
        const userId = this.authService.userId;
        this.getUser(userId);
    }

    Swiper = register();
    
    getUser(userId: string | null) {
        this.userService.getUser(userId).subscribe({
            next: (response: any) => {
                if (response.result_code === 1) {
                    this.userInfo = response.result_data;
                }
              },
              error: (error) => {
              }
        });
    }

    logout() {

        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
