import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TaylorComponent } from './taylor/taylor.component';
import { AuthGuard } from './_auth/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}  },
  { path: 'user', component: UserComponent,  canActivate:[AuthGuard], data:{roles:["USER"]} },
  { path: 'login', component: LoginComponent },
  { path: 'taylor', component: TaylorComponent ,  canActivate:[AuthGuard], data:{roles:["TAYLOR"]}},
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }