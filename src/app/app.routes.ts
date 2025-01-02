import { Routes } from '@angular/router';
import { HomeComponent } from './component/feature/home/home.component';
import { LoginComponent } from './component/feature/login/login.component';
import { WelfareComponent } from './component/feature/home/welfare/welfare.component';
import { AwardComponent } from './component/feature/home/award/award.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'vinclub',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: LoginComponent
    },

    {
        path: 'vinclub/welfare',
        component: WelfareComponent
    },
    {
        path: 'vinclub/award',
        component: AwardComponent
    }
];
