import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { AdminPanelComponent } from './componenti/admin-panel/admin-panel.component';
import { HomeComponent } from './componenti/home/home.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { UpdateComponent } from './componenti/update/update.component';
import { LogsComponent } from './componenti/logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent ,canActivate:[AuthGuardGuard,AdminGuardGuard]},
  {path: 'logsAdminPanel', component:AdminPanelComponent,canActivate:[AuthGuardGuard,AdminGuardGuard]},
  {path: 'home', component:HomeComponent,canActivate:[AuthGuardGuard]},
  { path: "update", component: UpdateComponent ,canActivate:[AuthGuardGuard,AdminGuardGuard]},
  { path: 'logs', component: LogsComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
