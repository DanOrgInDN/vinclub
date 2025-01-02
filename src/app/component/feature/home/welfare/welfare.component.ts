import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-benefit',
  imports: [NavComponent],
  templateUrl: './welfare.component.html',
  styleUrl: './welfare.component.scss'
})
export class WelfareComponent {
    constructor(private location: Location) {}

    goBack() {
        this.location.back();
    }
}
