//imports 
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


//importar componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StationComponent } from './components/station/station.component';
import { ErrorComponent } from './components/error/error.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { HistoryComponent } from './components/history/history.component';
import { RealtimeComponent } from './components/realtime/realtime.component';

import { IdentityGuard } from './services/identity.guard';


//definir rutas 
const appRoutes: Routes = [

    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'stations', component: StationComponent, canActivate: [IdentityGuard]},
    {path: 'station/:id', component: SensorsComponent, canActivate: [IdentityGuard]},
    {path: 'history/:id', component: HistoryComponent, canActivate: [IdentityGuard]},
    {path: 'realtime/:id', component: RealtimeComponent, canActivate: [IdentityGuard]},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'error', component: ErrorComponent},
    {path: '**', component: ErrorComponent}
];

//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);