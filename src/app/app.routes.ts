import { Routes } from '@angular/router';
import { HomeComponent } from './component/feature/home/home.component';
import { LoginComponent } from './component/feature/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: LoginComponent
    }
];
