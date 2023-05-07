import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { DepressionComponent } from './depression/depression.component';
import { NoDepressionComponent } from './no-depression/no-depression.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ["USER"] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'depression', component: DepressionComponent },
  { path: 'nodepression', component: NoDepressionComponent },
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
