import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
    providedIn: 'root',
  })
export class HotelService implements OnInit{
    currentUser: any;
    msg: any;

    constructor(private http: HttpClient, private token: TokenStorageService){

    }

    ngOnInit(){
      this.currentUser=this.token.getUser();
    }

    getHotelById(id:any):Observable<any>{
        return this.http.get(environment.apiUrls + 'hotel/getMyHotelById/' +id,{responseType:'json'});
    }

    addHotelDetails(id:any,hotelUsername:any,hotelName:any,hotelOwner:any,city:any,hotelAddress:any,phone:any,panNumber:any,
         status:any,description:any, latitude:any,longitude:any
        ):Observable<any>{
        return this.http.post(environment.apiUrls + 'adminController/addHotelDetail/' +id, {
          hotelUsername : hotelUsername,
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
    
    editHotelDetail( id: any,  hotelName: any,  hotelOwner: any,  city: any,
      hotelAddress: any,  panNumber: any, phone: any, latitude:any, longitude:any, description: any
    ): Observable<any> {
      return this.http.put(
        environment.apiUrls + 'hotel/updateHotelDetail/' + id,
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

    getRoomDetail(id:any):Observable<any>{
      return this.http.get(environment.apiUrls + 'hotel/getRoomOfMyHotel/' +id,{responseType:'json'});
    }

    getInactiveRoomDetail(id:any):Observable<any>{
      return this.http.get(environment.apiUrls + 'hotel/getInactiveRoomOfMyHotel/' +id,{responseType:'json'});
    }

    getRoomDetailById(id:any):Observable<any>{
      return this.http.get(environment.apiUrls + 'hotel/getRoomDetailById/' +id,{responseType:'json'});
    }

    editActiveRoomDetail(id:any,roomType:any,roomNumber:any,description:any):Observable<any>{
      return this.http.put(environment.apiUrls + 'room/updateRoomDetail/'+id,
      {
        roomType:roomType,
        roomNumber:roomNumber,
        description:description
      } ,{responseType:'json'});
    }
    
  getDocumentOfHotel(id: any): Observable<any> {
    return this.http.get(
      environment.apiUrls + 'hotelDocument/getHotelDocumentLink/' + id,
      { responseType: 'json' }
    );
  }

  loadHotelDocument(uploadDir: any): Observable<any> {
    return this.http.get(uploadDir, { responseType: 'blob' });
  }

  getTemporaryReservation(id:any):Observable<any>{
    return this.http.get(environment.apiUrls + 'temporaryReservation/getTemporaryReservationById/' +id, {responseType:'json'});
  }

  getReservation(id:any):Observable<any>{
    return this.http.get(environment.apiUrls + 'reservation/reservationDetailById/' +id, {responseType:'json'});
  }

 getNonReservedRoom(id:any):Observable<any>{
   return this.http.get(environment.apiUrls + 'room/getNonReservedRoomOfMyHotel/' +id, {responseType : 'json'});
 }

//  getActiveCustomer(id:any):Observable<any>{
//    return this.http.get(environment.apiUrls + '' +id, {responseType: 'json'});
//  }

 getReservedCustomer(id:any):Observable<any>{
   return this.http.get(environment.apiUrls + 'temporaryReservation/getTemporaryReservationById/' +id, {responseType:'json'});
 }

 getCheckOutCustomer(id:any):Observable<any>{
   return this.http.get(environment.apiUrls + 'reservation/getCheckOutCustomerDetailByHotelId/' +id, {responseType: 'json'});
 }

 getCustomerById(id:any):Observable<any>{
   return this.http.get(environment.apiUrls + 'hotel/getCustomerDetailById/' +id, {responseType:'json'});
 }

 findDistinctCheckOutCustomer(id:any):Observable<any>{
   return this.http.get(environment.apiUrls + 'hotel/getDistinctCheckOutCustomerDetail/' +id , {responseType:'json'});
 }

}