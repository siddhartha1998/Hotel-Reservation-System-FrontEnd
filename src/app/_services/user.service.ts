import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import {
  analyzeAndValidateNgModules,
  identifierModuleUrl,
} from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  currentUser: any;
  msg: any;

  constructor(private http: HttpClient, private token: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  addHotel(
    username: string,
    email: String,
    password: String,
    roles: Set<string> = new Set<string>()
  ): Observable<any> {
    console.log();
    return this.http.post(
      environment.apiUrls + 'auth/signup',
      { username: username, email: email, password: password, role: [roles] },
      { responseType: 'json' }
    );
  }
  getAllHotel(): Observable<any> {
    return this.http.get(environment.apiUrls + 'hotel/getHotelDetail', {
      responseType: 'json',
    });
  }

  getInactiveHotel(): Observable<any> {
    return this.http.get(environment.apiUrls + 'hotel/getInactiveHotelDetail', {
      responseType: 'json',
    });
  }

  getRegisteredHotel(): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'adminController/getRegisteredHotelDetail',
      { responseType: 'json' }
    );
  }

  delete(id: any): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/deleteHotelDetail/' + id,
      { responseType: 'json' }
    );
  }

  userDelete(user_id: any): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/deleteUserDetail/' + user_id,
      { responseType: 'json' }
    );
  }

  getActiveUser(): Observable<any> {
    return this.http.get(environment.apiUrls + 'customer/getCustomerDetail', {
      responseType: 'json',
    });
  }

  getInactiveUser(): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'customer/getInactiveCustomerDetail',
      { responseType: 'json' }
    );
  }

  customerDelete(id: any): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/deleteCustomerDetail/' + id,
      { responseType: 'json' }
    );
  }

  editHotelDetail(
    id: any,
    hotelName: any,
    hotelOwner: any,
    city: any,
    hotelAddress: any,
    panNumber: any,
    document: any,
    phone: any,
    description: any
  ): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/updateHotelDetail/' + id,
      {
        hotelName: hotelName,
        hotelOwner: hotelOwner,
        city: city,
        hotelAddress: hotelAddress,
        panNumber: panNumber,
        document: document,
        phone: phone,
        description: description,
      },
      { responseType: 'json' }
    );
  }

  editInactiveHoteldetail(id: any): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/updateActiveStatusOfHotel/' + id,
      { responseType: 'json' }
    );
  }

  getHotelById(id: any): Observable<any> {
    return this.http.get(environment.apiUrls + 'hotel/getHotelById/' + id, {
      responseType: 'json',
    });
  }

  getInactiveHotelById(id: any): Observable<any> {
    console.log(id);
    return this.http.get(
      environment.apiUrls + 'hotel/getInactiveHotelById/' + id,
      { responseType: 'json' }
    );
  }

  getRegisteredUserById(userId: any): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'adminController/getRegisteredUserById/' + userId,
      { responseType: 'json' }
    );
  }

  updateActiveStatus(id: number): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/updateActiveStatusOfHotel/' + id,
      { responsetype: 'json' }
    );
  }

  updateActiveStatusOfCustomer(id: number): Observable<any> {
    return this.http.put(
      environment.apiUrls +
        'adminController/updateActiveStatusOfCustomer/' +
        id,
      { responseType: 'json' }
    );
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'adminController/getCustomerById/' + id,
      { responseType: 'json' }
    );
  }

  editActiveCustomer(id: any, customerFullname: any, address: any, gender: any, idType: any, idNumber: any, phone: any, age: any
  ): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/updateCustomerDetail/' + id,
      {
        fullname: customerFullname,
        address: address,
        gender: gender,
        idType: idType,
        idNumber: idNumber,
        phone: phone,
        age: age,
      },
      { responseType: 'json' }
    );
  }

  getProfilePicture(id: any): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'profilePicture/getProfilePictureLink/' + id,
      { responseType: 'json' }
    );
  }

  loadProfilePicture(uploadDir: any): Observable<any> {
    return this.http.get(uploadDir, { responseType: 'blob' });
  }

  changePassword(username: any, form: any): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'ForgetPassword/changePassword/' + username,
      {
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      },
      { responseType: 'json' }
    );
  }

  generateOtp(username: any, email: any): Observable<any> {
    return this.http.post(
      environment.apiUrls + 'ForgetPassword/generateOtp',
      {
        username: username,
        email: email,
      },
      { responseType: 'json' }
    );
  }

  validateOtp(username: any, otpnum: any): Observable<any> {
    return this.http.post(
      environment.apiUrls +
        'ForgetPassword/validateOtp/' +
        username +
        '?otpnum=' +
        otpnum,
      { responseType: 'json' }
    );
  }

  // editProfilePic(id:any):Observable<any>{
  //   return this.http.put(environment.apiUrls '');
  // }

  deleteProfilePic(id: any): Observable<any> {
    return this.http.delete(
      environment.apiUrls + 'profilePicture/deleteProfilePictureById/' + id,
      { responseType: 'json' }
    );
  }

  addProfile(userId: Number, profile: FormData): Observable<any> {
    return this.http.post(
      environment.apiUrls +
        'profilePicture/addProfilePictureForAdmin/' +
        userId,
      profile,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  updateProfilePicture(userId: any, profile: FormData): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'profilePicture/updateProfilePicture/' + userId,
      profile,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
