import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NavComponent } from "../../../layout/nav/nav.component";

interface AppInfo {
  version: string;
  website: string;
  company: string;
  address: string;
  hotline: string;
}

@Component({
  selector: 'app-info',
  imports: [ CommonModule , NavComponent],
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent {
  appInfo: AppInfo = {
    version: '1.1.0',
    website: 'https://vinclub.site/',
    company: 'Công ty Cổ phần VinClub',
    address: 'Số 7, đường Bằng Lăng 1, Khu đô thị Vinhomes Riverside, Phường Việt Hưng, Quận Long Biên, Thành Phố Hà Nội, Việt Nam',
    hotline: '1900999911'
  };
}