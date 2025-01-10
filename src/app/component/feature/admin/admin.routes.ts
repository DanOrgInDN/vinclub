import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DepositManagementComponent } from './deposit-management/deposit-management.component';
import { WithdrawalManagementComponent } from './withdrawal-management/withdrawal-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReferenceCodeComponent } from './reference-code/reference-code.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'deposit', component: DepositManagementComponent },
      { path: 'withdrawal', component: WithdrawalManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'reference-code', component: ReferenceCodeComponent },
      { path: '', redirectTo: 'deposit', pathMatch: 'full' }
    ]
  }
];