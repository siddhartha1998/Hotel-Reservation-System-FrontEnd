import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';
import { OtpComponent } from './otp/otp.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CustomerComponent } from './customer/customer.component';
import { RoomPictureComponent } from './room-picture/room-picture.component';
import { HotelPictureComponent } from './hotel-picture/hotel-picture.component';
import { AuthGuard } from './_services/authGuard';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'homepage',component:HomepageComponent},
  {path:'hotel/:id',component:HotelComponent},
  {path:'hotel1/:id',component:HotelComponent},
  {path:'customer/:id',component:CustomerComponent},
  {path:'customer1/:id',component:CustomerComponent},
  {path:'room/:id',component:RoomComponent},
  {path:'room1/:id',component:RoomComponent},
  {path:'room2/:id',component:RoomComponent},
  {path:'room3/:id',component:RoomComponent},
  {path:'room4/:id',component:RoomComponent},
  {path:'reservation1/:id',component:ReservationComponent},
  {path:'reservation2/:id',component:ReservationComponent},
  {path:'reservation3/:id',component:ReservationComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'change-password',component:ChangePasswordComponent},
  { path:'user',component:UserComponent},
  { path:'homepage1/:id',component:HomepageComponent},
  { path:'homepage2/:id',component:HomepageComponent},
  { path:'homepage3/:id',component:HomepageComponent},
  { path:'room-picture/:id', component:RoomPictureComponent},
  { path:'room-detail/:id', component:RoomDetailComponent},
  { path:'room-detail1/:id', component:RoomDetailComponent},
  { path:'hotel-picture/:id', component:HotelPictureComponent},
  { path:'hotel-detail/:id', component:HotelDetailComponent},
  { path:'reservation-detail1/:id',component:ReservationDetailComponent},
  { path:'reservation-detail2/:id',component:ReservationDetailComponent},
  { path:'reservation-detail3/:id',component:ReservationDetailComponent},
  { path: 'customer-detail/:id', component: CustomerDetailComponent},
  { path: 'customer-detail1/:id',component: CustomerDetailComponent},
  { path: 'customer-detail2/:id',component: CustomerDetailComponent},
  { path: 'customer-detail3/:id',component: CustomerDetailComponent},
  { path:'profile',component:ProfileComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  { path:'otp',component:OtpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
