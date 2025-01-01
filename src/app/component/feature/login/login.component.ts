import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  currentUrl: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Lấy phần cuối cùng của URL
    this.route.url.subscribe(segments => {
      this.currentUrl = segments[segments.length - 1].path;
    });
  }
}
