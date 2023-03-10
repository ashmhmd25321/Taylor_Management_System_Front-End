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
import { RegisterComponent } from './register/register.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolverService } from './_services/product-resolver.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './_services/buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ["USER"] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'taylor', component: TaylorComponent, canActivate: [AuthGuard], data: { roles: ["TAYLOR"] } },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] }, resolve: {
      product: ProductResolverService
    }
  },
  { path: 'showProductDetails', component: ShowProductDetailsComponent, data: { roles: ['ADMIN'] }, canActivate: [AuthGuard] },
  {
    path: 'buyProduct', component: BuyProductComponent, data: { roles: ['USER'] }, canActivate: [AuthGuard],
    resolve:
    {
      productDetails: BuyProductResolverService
    }
  },
  { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve: { product: ProductResolverService } },
  { path: 'orderConfirm', component: OrderConfirmationComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { roles: ['USER'] } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
