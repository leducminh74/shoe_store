import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {MenuComponent} from "./components/menu/menu.component";
import {ContactComponent} from "./components/contact/contact.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrderComponent} from "./components/order/order.component";
import {ErrorComponent} from "./components/error/error.component";
import {DetailsComponent} from "./components/details/details.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ProductComponent} from "./admin/product/product.component";
import {ProductAddComponent} from "./admin/product/product-add/product-add.component";
import {ProductEditComponent} from "./admin/product/product-edit/product-edit.component";
import {TagComponent} from "./admin/tag/tag.component";
import {TagAddComponent} from "./admin/tag/tag-add/tag-add.component";
import {TagEditComponent} from "./admin/tag/tag-edit/tag-edit.component";
import {UserComponent} from "./admin/user/user.component";
import {UserAddComponent} from "./admin/user/user-add/user-add.component";
import {AuthGuard} from "./shared/auth.guard";
import {RoleGuard} from "./shared/role.guard";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {ResetPasswordForgetComponent} from "./components/reset-password-forget/reset-password-forget.component";
import {VerifyAccountComponent} from "./components/verify-account/verify-account.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {LoginCheckGuard} from "./shared/login-check.guard";
import {ViewInfoComponent} from "./components/view-info/view-info.component";
import {OrderHistoryComponent} from "./components/order-history/order-history.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {OrderAdminComponent} from "./admin/order-admin/order-admin.component";
import {ColorComponent} from "./admin/color/color.component";
import {SizeComponent} from "./admin/size/size.component";
import {ColorAddComponent} from "./admin/color/color-add/color-add.component";
import {ColorEditComponent} from "./admin/color/color-edit/color-edit.component";
import {SizeAddComponent} from "./admin/size/size-add/size-add.component";
import {SizeEditComponent} from "./admin/size/size-edit/size-edit.component";
import {FavoriteComponent} from "./components/favorite/favorite.component";
import {RevenueComponent} from "./admin/revenue/revenue.component";

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'menu', component: MenuComponent},
  {path:'contact', component: ContactComponent},
  {path:'cart', component: CartComponent},
  {path:'order', component: OrderComponent,canActivate:[AuthGuard]},
  {path:'details/:id/:cid', component: DetailsComponent},
  {path:'login', component: LoginComponent,canActivate:[LoginCheckGuard]},
  {path:'signup', component: SignupComponent,canActivate:[LoginCheckGuard]},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'reset_password', component: ResetPasswordForgetComponent},
  {path:'verify', component: VerifyAccountComponent},
  {path:'change-password', component: ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'admin',component:RevenueComponent,canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/revenue', children:[
      {path:'',component: RevenueComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/food', children:[
      {path:'',component: ProductComponent},
      {path:'add',component: ProductAddComponent},
      {path:'edit/:id',component: ProductEditComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/tag', children:[
      {path:'',component: TagComponent},
      {path:'add',component: TagAddComponent},
      {path:'edit/:id',component: TagEditComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/user', children:[
      {path:'',component: UserComponent},
      {path:'add',component: UserAddComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/order', children:[
      {path:'',component: OrderAdminComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/color', children:[
      {path:'',component: ColorComponent},
      {path:'add',component: ColorAddComponent},
      {path:'edit/:id',component: ColorEditComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'admin/size', children:[
      {path:'',component: SizeComponent},
      {path:'add',component: SizeAddComponent},
      {path:'edit/:id',component: SizeEditComponent}
    ], canActivate:[AuthGuard,RoleGuard]},
  {path:'order',component:OrderComponent,canActivate:[AuthGuard]},
  {path:'view-profile',component:ViewInfoComponent,canActivate:[AuthGuard]},
  {path:'order-history',component:OrderHistoryComponent,canActivate:[AuthGuard]},
  {path:'favorite',component:FavoriteComponent,canActivate:[AuthGuard]},
  {path:'payment',component:PaymentComponent,canActivate:[AuthGuard]},
  {path:'**', pathMatch: 'full', component: ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
