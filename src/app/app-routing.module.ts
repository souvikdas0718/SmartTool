import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components import
import { LoginComponent }   from './login/login.component';

// URL path definitions
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Index page
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
