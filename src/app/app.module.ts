import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { MainComponent } from './main/main.component';
import { CookieService } from 'ngx-cookie-service';
import { GraphAnalyticsComponent } from './graph-analytics/graph-analytics.component';
import { ClientFormComponent } from './client-form/client-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AlertModalComponent,
    MainComponent,
    GraphAnalyticsComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
