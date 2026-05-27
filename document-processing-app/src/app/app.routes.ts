import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/features/auth/login/login.component';
import { MainLayoutComponent } from './presentation/shared/components/layout/main-layout/main-layout.component';
import { DashboardAdminComponent } from './presentation/features/admin/dashboard-admin/dashboard-admin.component';
import { OficinasComponent } from './presentation/features/admin/oficinas/oficinas.component';

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
        component: MainLayoutComponent,
        children: [
            {path: '', component: DashboardAdminComponent},
            {path: 'oficinas', component: OficinasComponent}
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
