import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benefit',
  imports: [NavComponent],
  templateUrl: './welfare.component.html',
  styleUrl: './welfare.component.scss'
})
export class WelfareComponent {
    constructor(private router: Router) {}

    goBack() {
        this.router.navigate(['/home']);
    }
}
