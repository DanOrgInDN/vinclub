import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private router: Router) {}

  getImageSrc(route: string, activeImg: string, inactiveImg: string): string {
    if (route === '/vinclub') {
      // Check cho trang chủ: url là /vinclub hoặc trống
      return this.router.url === '/vinclub' || this.router.url === '/' 
        ? activeImg 
        : inactiveImg;
    }
    // Các route khác check bình thường
    return this.router.url === route ? activeImg : inactiveImg;
  }
}
