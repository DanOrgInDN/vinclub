import { Routes } from '@angular/router';
import { HomeComponent } from './component/feature/home/home.component';
import { LoginComponent } from './component/feature/login/login.component';
import { WelfareComponent } from './component/feature/home/welfare/welfare.component';
import { AwardComponent } from './component/feature/home/award/award.component';
import { TargetComponent } from './component/feature/home/target/target.component';
import { ProductComponent } from './component/feature/home/product/product.component';
import { ChangePasswordComponent } from './component/feature/home/change-password/change-password.component';
import { ProfitProfileComponent } from './component/feature/home/profit-profile/profit-profile.component';
import { InvestmentReasonComponent } from './component/feature/home/investment-reason/investment-reason.component';

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
    },
    {
        path: 'vinclub/target',
        component: TargetComponent
    },
    {
        path: 'vinclub/product',
        component: ProductComponent
    },
    {
        path: 'vinclub/change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'vinclub/profit-profile',
        component: ProfitProfileComponent
    },
    {
        path: 'vinclub/investment-reason',
        component: InvestmentReasonComponent
    }
];
