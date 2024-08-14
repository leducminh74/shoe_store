import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { SliderComponent } from './components/slider/slider.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ErrorComponent } from './components/error/error.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RatingModule} from "ng-starrating";
import {ReactiveFormsModule} from "@angular/forms";
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './admin/product/product.component';
import { TagComponent } from './admin/tag/tag.component';
import { UserComponent } from './admin/user/user.component';
import { TopbarComponent } from './admin/topbar/topbar.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProductAddComponent } from './admin/product/product-add/product-add.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { TagAddComponent } from './admin/tag/tag-add/tag-add.component';
import { TagEditComponent } from './admin/tag/tag-edit/tag-edit.component';
import { UserAddComponent } from './admin/user/user-add/user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SliderComponent,
    MenuComponent,
    ContactComponent,
    CartComponent,
    OrderComponent,
    ErrorComponent,
    DetailsComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    TagComponent,
    UserComponent,
    TopbarComponent,
    SidebarComponent,
    ProductAddComponent,
    ProductEditComponent,
    TagAddComponent,
    TagEditComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    RatingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
