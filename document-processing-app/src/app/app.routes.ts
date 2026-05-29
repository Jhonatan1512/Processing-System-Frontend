import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/features/auth/login/login.component';
import { MainLayoutComponent } from './presentation/shared/components/layout/main-layout/main-layout.component';
import { DashboardAdminComponent } from './presentation/features/admin/dashboard-admin/dashboard-admin.component';
import { OficinasComponent } from './presentation/features/admin/oficinas/oficinas.component';
import { DashboardPersonalComponent } from './presentation/features/personal/dashboard-personal/dashboard-personal.component';
import { ExpedientesNuevosComponent } from './presentation/features/personal/expedientes-nuevos/expedientes-nuevos.component';
import { DashboardCiudadanoComponent } from './presentation/features/ciudadano/dashboard-ciudadano/dashboard-ciudadano.component';
import { ExpedientesCiudadanoComponent } from './presentation/features/ciudadano/expedientes-ciudadano/expedientes-ciudadano.component';
import { authGuard } from './presentation/shared/guards/auth.guard';

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
        canActivate: [authGuard],
        component: MainLayoutComponent,
        children: [
            {path: '', component: DashboardAdminComponent},
            {path: 'oficinas', component: OficinasComponent}
        ]
    },
    {
        path: 'personal',
        canActivate: [authGuard],
        component: MainLayoutComponent,
        children: [
            {path: '', component: DashboardPersonalComponent},
            {path: 'expedientes', component: ExpedientesNuevosComponent}
        ]
    },
    {
        path: 'ciudadano',
        canActivate: [authGuard],
        component: MainLayoutComponent,
        children: [
            {path: '', component: DashboardCiudadanoComponent},
            {path: 'acciones-expedientes', component: ExpedientesCiudadanoComponent}
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
