import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { HomeComponent } from './componenti/home/home.component';
import { AdminPanelComponent } from './componenti/admin-panel/admin-panel.component';
import { NavBarComponent } from './componenti/nav-bar/nav-bar.component';
import { UpdateComponent } from './componenti/update/update.component';
import { LogsComponent } from './componenti/logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminPanelComponent,
    NavBarComponent,
    UpdateComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
