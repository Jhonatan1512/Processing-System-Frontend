import { Routes } from '@angular/router';
import { NavbarComponent } from './presentation/shared/components/layout/navbar/navbar.component';
import { LoginComponent } from './presentation/features/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent 
    },
    {
        path: 'admin',
        component: NavbarComponent,
        children: [

        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
