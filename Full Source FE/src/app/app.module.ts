import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordForgetComponent } from './components/reset-password-forget/reset-password-forget.component';
import {DatePipe} from "@angular/common";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {NgxUiLoaderHttpModule, NgxUiLoaderModule} from "ngx-ui-loader";
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {MatMenuModule} from "@angular/material/menu";
import { ViewInfoComponent } from './components/view-info/view-info.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import { PaymentComponent } from './components/payment/payment.component';
import {MatDividerModule} from "@angular/material/divider";

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { OrderAdminComponent } from './admin/order-admin/order-admin.component';
import { ColorComponent } from './admin/color/color.component';
import { SizeComponent } from './admin/size/size.component';
import { SizeAddComponent } from './admin/size/size-add/size-add.component';
import { SizeEditComponent } from './admin/size/size-edit/size-edit.component';
import { ColorAddComponent } from './admin/color/color-add/color-add.component';
import { ColorEditComponent } from './admin/color/color-edit/color-edit.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { FavoriteComponent } from './components/favorite/favorite.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { RevenueComponent } from './admin/revenue/revenue.component';
import {MatTabsModule} from "@angular/material/tabs";
import { NgChartsModule } from 'ng2-charts';
import {MatSnackBarModule} from "@angular/material/snack-bar";


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
    UserAddComponent,
    ForgotPasswordComponent,
    ResetPasswordForgetComponent,
    VerifyAccountComponent,
    ChangePasswordComponent,
    ViewInfoComponent,
    OrderHistoryComponent,
    PaymentComponent,
    OrderAdminComponent,
    ColorComponent,
    SizeComponent,
    SizeAddComponent,
    SizeEditComponent,
    ColorAddComponent,
    ColorEditComponent,
    FavoriteComponent,
    RevenueComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
        HttpClientModule,
        RatingModule,
        ReactiveFormsModule,
        NgxUiLoaderModule,
        NgxUiLoaderHttpModule.forRoot({
            showForeground: true
        }),
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        FormsModule,
        MatTableModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDividerModule,
        SocialLoginModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatTabsModule,
        NgChartsModule,
        MatSnackBarModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1242899746592292')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    DatePipe,[{provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,multi:true}
    ]

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
