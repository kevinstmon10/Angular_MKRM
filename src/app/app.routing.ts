//imports 
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


//importar componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StationComponent } from './components/station/station.component';
import { ErrorComponent } from './components/error/error.component';

import { IdentityGuard } from './services/identity.guard';


//definir rutas 
const appRoutes: Routes = [

    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'stations', component: StationComponent, canActivate: [IdentityGuard]},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'error', component: ErrorComponent, canActivate: [IdentityGuard]},
    {path: '**', component: ErrorComponent, canActivate: [IdentityGuard]}
];

//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);