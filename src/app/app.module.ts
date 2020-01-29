import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { routing, appRoutingProviders} from './app.routing';
import { MomentModule } from 'angular2-moment';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StationComponent } from './components/station/station.component';

import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { ErrorComponent } from './components/error/error.component';
import { ReplaceUnderscorePipe } from './pipes/replace-underscore.pipe';
import { SensorsComponent } from './components/sensors/sensors.component';
import { HistoryComponent } from './components/history/history.component';
import { RealtimeComponent } from './components/realtime/realtime.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StationComponent,
    ErrorComponent,
    ReplaceUnderscorePipe,
    SensorsComponent,
    HistoryComponent,
    RealtimeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    MomentModule,
    HighchartsChartModule
      
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
