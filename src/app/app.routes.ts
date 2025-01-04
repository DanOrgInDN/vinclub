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
import { RechargeComponent } from './component/feature/home/recharge/recharge.component';
import { WithdrawalComponent } from './component/feature/home/withdrawal/withdrawal.component';
import { TransactionHistoryComponent } from './component/feature/home/transaction-history/transaction-history.component';
import { ProfileComponent } from './component/feature/home/profile/profile.component';
import { AppInfoComponent } from './component/feature/home/app-info/app-info.component';
import { NewsComponent } from './component/feature/home/news/news.component';

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
    },
    {
        path: 'vinclub/recharge',
        component: RechargeComponent
    },
    {
        path: 'vinclub/withdrawal',
        component: WithdrawalComponent
    },
    {
        path: 'vinclub/transaction-history',
        component: TransactionHistoryComponent
    },
    {
        path: 'vinclub/profile',
        component: ProfileComponent
    },
    {
        path: 'vinclub/app-info',
        component: AppInfoComponent
    },
    {
        path: 'vinclub/news',
        component: NewsComponent
    },
    {
        path: 'vinclub/admin',
        loadChildren: () => import('./component/feature/admin/admin.routes')
          .then(m => m.adminRoutes)
    }
];
