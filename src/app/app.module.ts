import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { MainComponent } from './main/main.component';
import { CookieService } from 'ngx-cookie-service';
import { RevenueComponent } from './revenueForm/revenueForm.component';
import { GraphAnalyticsComponent } from './graph-analytics/graph-analytics.component';
import { HeaderComponent } from './header/header.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientDisplayComponent } from './client-display/client-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RevenueComponent,
    AlertModalComponent,
    MainComponent,
    GraphAnalyticsComponent,
    HeaderComponent,
    ClientFormComponent,
    ClientDisplayComponent
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
