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

  userRegister(username: any, email: any, password: any,
    roles:any
  ): Observable<any> {
  
    return this.http.post(
      environment.apiUrls + 'auth/signup',
      { username: username, email: email, password: password, role: roles },
      { responseType: 'json' }
    );
  }

  findAllHotel(): Observable<any> {
    return this.http.get(environment.apiUrls + 'hotel/getAllHotel', {
      responseType: 'json',
    });
  }

  getActiveHotel(): Observable<any> {
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

  getRegisteredUser():Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getRegisteredHotelOnly/', {responseType:'json'});
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

  getActiveCustomer(): Observable<any> {
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

  addHotelDetails(id:any,  hotelName:any,hotelOwner:any,city:any,hotelAddress:any,phone:any,panNumber:any,
  status:any,description:any, latitude:any,longitude:any
    ):Observable<any>{
    return this.http.post(environment.apiUrls + 'adminController/addHotelDetail/' +id, {
    
      hotelName : hotelName,
      hotelOwner : hotelOwner,
      city : city,
      hotelAddress : hotelAddress,
      phone : phone,
      panNumber : panNumber,
      status : status,
      description : description,
      latitude : latitude,
      longitude : longitude
    }, {responseType:'json'});
  }

  addHotelPicture(hotelId: Number, hotelPic: FormData): Observable<any> {
    return this.http.post(
      environment.apiUrls +
        'hotelPicture/addPictureForHotel/' +
        hotelId,
        hotelPic,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  getPictureOfHotel(id: any): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'hotelPicture/getHotelPictureLink/' + id,
      { responseType: 'json' }
    );
  }

  loadHotelPicture(uploadDir: any): Observable<any> {
    return this.http.get(uploadDir, { responseType: 'blob' });
  }

  deleteHotelPic(id:any):Observable<any>{
    return this.http.delete(environment.apiUrls + 'hotelPicture/deleteHotelPictureById/' +id,
    {responseType:'json'});
  }

  addHotelDocument(hotelId: Number, hotelDocument: FormData): Observable<any> {
    return this.http.post(
      environment.apiUrls +
        'hotelDocument/addDocumentForHotel/' +
        hotelId,
        hotelDocument,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  editHotelDetail( id: any,  hotelName: any,  hotelOwner: any,  city: any,
    hotelAddress: any,  panNumber: any, phone: any, latitude:any, longitude:any, description: any
  ): Observable<any> {
    return this.http.put(
      environment.apiUrls + 'adminController/updateHotelDetail/' + id,
      {
        hotelName: hotelName,
        hotelOwner: hotelOwner,
        city: city,
        hotelAddress: hotelAddress,
        panNumber: panNumber,
        phone: phone,
        latitude : latitude,
        longitude : longitude,
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

  addCustomerDetail(userId:any,fullname:any,address:any,gender:any,idType:any,idNumber:any,phone:any,age:any):Observable<any>{
  return  this.http.post(environment.apiUrls + 'adminController/addCustomerDetails/' +userId,
    {
      fullname:fullname,
      address:address,
      gender:gender,
      idType:idType,
      idNumber:idNumber,
      phone:phone,
      age:age
    },{responseType:'json'});
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

  addRoom(id:any,roomNumber:any,roomType:any,description:any):Observable<any>{
    return this.http.post(environment.apiUrls + 'adminController/addRoomDetail/' +id, 
    {
      roomNumber:roomNumber,
      roomType:roomType,
      description:description
    },
    {responseType:'json'});
  }

  getRoomDetail():Observable<any>{
    return this.http.get(environment.apiUrls + 'room/getRoomDetail/', {responseType:'json'});
  } 

  getInactiveRoomDetail():Observable<any>{
    return this.http.get(environment.apiUrls + 'room/getInactiveRoom/', {responseType:'json'});
  }

  getActiveRoomDetail():Observable<any>{
    return this.http.get(environment.apiUrls + 'room/getActiveRoom/', {responseType:'json'});
  }

  getRoomDetailById(id:any):Observable<any>{
    return this.http.get(environment.apiUrls + 'room/getRoomDetailById/' +id,{responseType:'json'});
  }

  getPictureOfRoom(id: any): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'roomPicture/getRoomPictureLink/' + id,
      { responseType: 'json' }
    );
  }

  loadRoomPicture(uploadDir: any): Observable<any> {
    return this.http.get(uploadDir, { responseType: 'blob' });
  }

  deleteRoomPic(id: any): Observable<any> {
    return this.http.delete(
      environment.apiUrls + 'roomPicture/deleteRoomPictureById/' + id,
      { responseType: 'json' }
    );
  }


  getRoomDetailByHotelId(id:any):Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getRoomDetailByHotelId/' +id,{responseType:'json'});
  }

  editRoomById(id:any,roomNumber:any, roomType:any, description:any):Observable<any>{
    return this.http.put(environment.apiUrls + 'room/updateRoomDetail/' +id,
    {
      roomNumber:roomNumber,
      roomType:roomType,
      description:description
    },
    {responseType:'json'});
  }

  editActiveStatusOfRoom(id:any):Observable<any>{
    return this.http.put(environment.apiUrls + 'adminController/updateActiveStatusOfRoom/' +id,{responseType:'json'});
  }

  deleteRoomById(id:any):Observable<any>{
    return this.http.put(environment.apiUrls + 'adminController/deleteRoomDetail/' +id, {responseType:'json'});
  }

  getTemporaryReservationDetail():Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getTemporaryReservation/', {responseType:'json'});
  }

  getReservedRoom():Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getReservedRoom/', {responseType:'json'});
  }

  getNonReservedRoom():Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getNonReservedRoom/', {responseType:'json'});
  }

  getReservedRoomById(id:any):Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getReservationDetailById/' +id,{responseType:'json'});
  }

  getTemporaryReservationById(id:any):Observable<any>{
    return this.http.get(environment.apiUrls + 'adminController/getTemporaryReservationDetailById/' +id,{responseType:'json'});
  }

  editReservationDetail(id:any,noOfGuest:any,checkInDate:any,checkOutDate:any,idType:any,idNumber:any):Observable<any>{
    return this.http.put(environment.apiUrls + 'adminController/updateReservationDetail/' +id,
    {
      noOfGuest : noOfGuest,
      checkInDate : checkInDate,
      checkOutDate : checkOutDate,
      idType : idType,
      idNumber : idNumber
    },
    {responseType:'json'});
  }

  editTemporaryReservation(id:any,noOfGuest:any,checkInDate:any,checkOutDate:any,idType:any,idNumber:any):Observable<any>{
    return this.http.put(environment.apiUrls + 'adminController/updateTemporaryReservation/' +id,
    {
      noOfGuest : noOfGuest,
      checkInDate : checkInDate,
      checkOutDate : checkOutDate,
      idType : idType,
      idNumber : idNumber
    },
    {responseType:'json'});
  }

  // deleteReservationById(id:any):Observable<any>{
  //   return this.http.put(environment.apiUrls + 'adminController/deleteReservationDetail/' +id, {responseType:'json'});
  // }

  deleteTemporaryReservation(id:any):Observable<any>{
    return this.http.put(environment.apiUrls + 'adminController/deleteTemporaryReservation/' +id, {responseType:'json'});
  }

  newReservation(hotelId:any,roomId:any,customerId:any,hotelName:any,roomNumber:any,fullname:any,
    checkInDate:any,checkOutDate:any,noOfGuest:any,idType:any, idNumber:any):Observable<any>{
    return this.http.post(environment.apiUrls + 'adminController/newTemporaryReservation/hotel/'
     +hotelId+"/room/" +roomId+"/customer/" +customerId ,
    {
      hotelName:hotelName,
      roomNumber:roomNumber,
      fullname:fullname,
      checkInDate:checkInDate,
      checkOutDate:checkOutDate,
      noOfGuest:noOfGuest,
      idType:idType,
      idNumber:idNumber
    },{responseType:'json'});
  }

  confirmReservation(id:any):Observable<any>{
    return this.http.post(environment.apiUrls + 'adminController/transfer/' +id, {responseType:'json'});
  }

checkOut(id:any):Observable<any>{
  return this.http.put(environment.apiUrls + 'adminController/checkOut/'  +id,
  {responseType:'json'});
}

addRoomProfile(hotelId: any,roomId:any, roomPic: FormData): Observable<any> {
  return this.http.post(
    environment.apiUrls +
      'roomPicture/addPictureForRoom/' +
      hotelId +  "/" +roomId,
    roomPic,
    {
      reportProgress: true,
      observe: 'events',
    }
  );
}

}
