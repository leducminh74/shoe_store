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

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'menu', component: MenuComponent},
  {path:'contact', component: ContactComponent},
  {path:'cart', component: CartComponent},
  {path:'order', component: OrderComponent,canActivate:[AuthGuard]},
  {path:'details/:id', component: DetailsComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
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
  {path:'order',component:OrderComponent},
  {path:'**', pathMatch: 'full', component: ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
