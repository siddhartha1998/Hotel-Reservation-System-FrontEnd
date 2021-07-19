import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
// import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { RoomComponent } from './room/room.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';
import { OtpComponent } from './otp/otp.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CustomerComponent } from './customer/customer.component';
import { CommonModule } from '@angular/common';
import { RoomPictureComponent } from './room-picture/room-picture.component';
import { HotelPictureComponent } from './hotel-picture/hotel-picture.component';
import { AuthGuard } from './_services/authGuard';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    HotelComponent,
    RegisterComponent,
    RoomComponent,
    ReservationComponent,
    CheckoutComponent,
    ChangePasswordComponent,
    UserComponent,
    OtpComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    CustomerComponent,
    RoomPictureComponent,
    HotelPictureComponent,
    HotelDetailComponent,
    RoomDetailComponent,
    ReservationDetailComponent,
    CustomerDetailComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    CommonModule,
    NgApexchartsModule,
    
    //for delete confirmation
ConfirmationPopoverModule.forRoot({​​​​​
confirmButtonType: 'danger', // set defaults here
}),
  ],

  providers: [authInterceptorProviders,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
